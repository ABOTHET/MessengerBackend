import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountsService } from "../accounts/accounts.service";
import { TheAccountDoesNotExist } from "../exceptions/The_account_does_not_exist";
import { InvalidPassword } from "../exceptions/Invalid_password";
import * as bcrypt from "bcrypt";
import { RefreshTokensService } from "../refresh_tokens/refresh_tokens.service";
import { ICreateAccountDto } from "../accounts/dto/create_account.dto";

@Injectable()
export class AuthService {

    constructor(@Inject(forwardRef(() => AccountsService)) private accountsService: AccountsService, private refreshTokensService: RefreshTokensService) {}

    async login(createAccount: ICreateAccountDto) {
        const account = await this.accountsService.getAccountByPhone(createAccount.phone);
        if (!account) {
            throw new TheAccountDoesNotExist();
        }
        const validatePassword = await bcrypt.compare(createAccount.password, account.password);
        if (!validatePassword) {
            throw new InvalidPassword();
        }
        const tokens = await this.refreshTokensService.generateTokens(account);
        await this.refreshTokensService
            .saveRefreshToken({account_id: account.id, refresh_token: tokens.refresh_token});
        return tokens;
    }

    async logout(refresh_token: string) {
        await this.refreshTokensService.logout(refresh_token);
    }

    async refresh(refresh_token: string) {
        return await this.refreshTokensService.refresh(refresh_token);
    }

}
