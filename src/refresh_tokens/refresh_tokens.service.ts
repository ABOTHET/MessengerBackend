import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RefreshToken } from "./models/refresh_tokens.model";
import { JwtService } from "@nestjs/jwt";
import { Account } from "../accounts/models/accounts.model";
import { PayloadToken } from "./payload/payload_token";
import { ICreateRefreshTokenDto } from "./dto/create_refresh_token.dto";
import { AccountsService } from "../accounts/accounts.service";
import { env } from "process";

@Injectable()
export class RefreshTokensService {

    constructor(@InjectModel(RefreshToken) private refreshTokenRepository: typeof RefreshToken,
                private jwtService: JwtService, @Inject(forwardRef(() => AccountsService)) private accountsService: AccountsService) {}

    async logout(refresh_token: string) {
        if (!refresh_token) {
            throw new UnauthorizedException("Вы не авторизованы");
        }
        await this.refreshTokenRepository.destroy({where: {refresh_token: refresh_token}});
    }

    async refresh(refresh_token: string) {
        if (!refresh_token) {
            throw new UnauthorizedException("Вы не авторизованы");
        }
        const token = await this.validateRefreshToken(refresh_token);
        const tokenFromDB = await this.refreshTokenRepository
            .findOne({where: {refresh_token: refresh_token}});
        if (token && tokenFromDB) {
            const account = await this.accountsService.getAccountById(token.id);
            const tokens = await this.generateTokens(account);
            await this.saveRefreshToken({ account_id: account.id, refresh_token: tokens.refresh_token });
            return tokens;
        }
        throw new UnauthorizedException("Вы не авторизованы");
    }

    async generateTokens(account: Account) {
        const payload = {...new PayloadToken(account)};
        const tokens = {
            access_token: await this.jwtService.signAsync(payload, {
                secret: env["PRIVATE_KEY"],
                expiresIn: env["EXPIRESIN_ACCESS"]
            }),
            refresh_token: await this.jwtService.signAsync(payload, {
                secret: env["PRIVATE_KEY_REFR"],
                expiresIn: env["EXPIRESIN_REFRESH"]
            })
        };
        return {
            id: account.id,
            ...tokens
        };
    }


    async saveRefreshToken(createRefreshToken: ICreateRefreshTokenDto) {
        const token = await this.refreshTokenRepository
            .findOne({ where: { account_id: createRefreshToken.account_id } });
        if (token) {
            token.refresh_token = createRefreshToken.refresh_token;
            await token.save();
        } else {
            await this.refreshTokenRepository.create(createRefreshToken);
        }
    }

    async validateAccessToken(access_token: string) {
        try {
            return await this.jwtService.verifyAsync(access_token, {
                secret: env["PRIVATE_KEY"]
            });
        } catch (e) {
            return null;
        }
    }

    async validateRefreshToken(refresh_token: string) {
        try {
            return await this.jwtService.verifyAsync(refresh_token, {
                secret: env["PRIVATE_KEY_REFR"]
            });
        } catch (e) {
            return null;
        }
    }

}
