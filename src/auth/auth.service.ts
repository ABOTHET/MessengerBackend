import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateAccountDto } from "../accounts/dto/createAccount.dto";
import { AccountsService } from "../accounts/accounts.service";
import * as bcrypt from "bcrypt"
import { InvalidAccountData } from "../accounts/exceptions/invalidAccountData";
import { JwtService } from "@nestjs/jwt";
import { Account } from "../accounts/model/accounts.model";
import * as process from "process";
import { Payload } from "./payload/payload";
import { InjectModel } from "@nestjs/sequelize";
import { RefreshToken } from "./model/refreshTokens.model";

@Injectable()
export class AuthService {

    constructor(@Inject(forwardRef(() => AccountsService)) private accountService: AccountsService,
                private jwtService: JwtService,
                @InjectModel(RefreshToken) private refreshTokenRepository: typeof RefreshToken) {
    }

    async login(accountDto: CreateAccountDto) {
        const account = await this.accountService.getAccountByPhone(accountDto.phone);
        const passwordComparison = await bcrypt.compare(accountDto.password, account.password);
        if (!passwordComparison) {
            throw new InvalidAccountData();
        }
        const tokens = await this.generateTokens(account);
        await this.saveRefreshTokenById(account.id, tokens.refreshToken);
        return tokens;
    }

    async logout(refreshToken: string) {
        await this.refreshTokenRepository.destroy({where: {refreshToken: refreshToken}});
    }

    async generateTokens(account: Account) {
        const payload = Payload.getPayload(account);
        const tokens = {
            accessToken: await this.jwtService.signAsync(payload, {
                secret: process.env.PRIVATE_KEY,
                expiresIn: process.env.EXPIRESIN_ACCESS
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                secret: process.env.PRIVATE_KEY_REFR,
                expiresIn: process.env.EXPIRESIN_REFRESH
            })
        }
        return tokens;
    }

    async saveRefreshTokenById(idAccount: number, refreshToken: string) {
        const token = await this.refreshTokenRepository
            .findOne({where: {idAccount: idAccount}});
        if (token) {
            token.refreshToken = refreshToken;
            await token.save();
            return true;
        }
        await this.refreshTokenRepository.create({idAccount, refreshToken});
        return true;
    }

    async validateAccessToken(accessToken: string) {
        try {
            const token = await this.jwtService.verifyAsync(accessToken, {
                secret: process.env.PRIVATE_KEY
            })
            return token;
        } catch (e) {
            return null;
        }
    }

    private async validateRefreshToken(refreshToken: string) {
        try {
            const token = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.PRIVATE_KEY_REFR
            })
            return token;
        } catch (e) {
            return null;
        }
    }

    async refresh(refreshToken: string) {
        const token = await this.validateRefreshToken(refreshToken);
        const tokenFromDB = await this.refreshTokenRepository
            .findOne({where: {refreshToken: refreshToken}});
        if (token && tokenFromDB) {
            const account = await this.accountService.getAccountById(token.id);
            const tokens = await this.generateTokens(account);
            await this.saveRefreshTokenById(account.id, tokens.refreshToken);
            return tokens;
        }
        throw new UnauthorizedException("Вы не авторизованы");
    }
}
