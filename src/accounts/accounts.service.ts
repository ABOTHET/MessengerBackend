import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Account } from "./models/accounts.model";
import * as bcrypt from "bcrypt";
import { ThePhoneIsAlreadyBusy } from "../exceptions/The_phone_is_already_busy";
import { AuthService } from "../auth/auth.service";
import { RefreshTokensService } from "../refresh_tokens/refresh_tokens.service";
import { ICreateAccountDto } from "./dto/create_account.dto";
import { DataAboutAccountsService } from "../data_about_accounts/data_about_accounts.service";
import * as fs from "fs";

@Injectable()
export class AccountsService {

    cities;

    constructor(@InjectModel(Account) private accountRepository: typeof Account,
                @Inject(forwardRef(() => AuthService)) private authService: AuthService,
                @Inject(forwardRef(() => RefreshTokensService)) private refreshTokensService: RefreshTokensService,
                @Inject(forwardRef(() => DataAboutAccountsService)) private dataAboutAccountsService: DataAboutAccountsService) {}

    async getCityById(id: number) {
        if (!this.cities) {
            const data = await fs.promises.readFile(`./src/assets/cities.json`, "utf-8");
            this.cities = JSON.parse(Buffer.from(data).toString("utf8"));
        }
        return this.cities[id];
    }

    async createAccount(createAccount: ICreateAccountDto) {
        const accountFromDB = await this.getAccountByPhone(createAccount.phone);
        if (accountFromDB) {
            throw new ThePhoneIsAlreadyBusy();
        }
        const hashPassword = await bcrypt.hash(createAccount.password, 3);
        const changeData = { ...createAccount, password: hashPassword };
        const newAccount = await this.accountRepository.create(changeData);
        const tokens = await this.refreshTokensService.generateTokens(newAccount);
        await this.refreshTokensService
            .saveRefreshToken({ account_id: newAccount.id, refresh_token: tokens.refresh_token });
        await this.dataAboutAccountsService.createDataAboutAccount(newAccount.id);
        return tokens;
    }

    async getAccountById(id: number) {
        return await this.accountRepository.findByPk(id);
    }

    async getAccountByPhone(phone: string) {
        return await this.accountRepository.findOne({ where: { phone: phone }, include: { all: true } });
    }

}
