import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CreateAccountDto } from "./dto/createAccount.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Account } from "./model/accounts.model";
import { AccountIsBusy } from "./exceptions/accountIsBusy";
import { DataAboutAccount } from "./model/dataAboutAccounts.model";
import { TheAccountDoesNotExist } from "./exceptions/theAccountDoesNotExist";
import * as bcrypt from "bcrypt";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AccountsService {

    constructor(@InjectModel(Account) private accountsRepository: typeof Account,
                @InjectModel(DataAboutAccount) private dataAboutAccountsRepository: typeof DataAboutAccount,
                @Inject(forwardRef(() => AuthService)) private authService: AuthService) {
    }

    async createAccount(accountDto: CreateAccountDto) {
        const account = await this.accountsRepository
            .findOne({where: {phone: accountDto.phone}});
        if (account) {
            throw new AccountIsBusy();
        }
        const hashPassword = await bcrypt.hash(accountDto.password, 3);
        const createdAccount = await this.accountsRepository.create({...accountDto, password: hashPassword});
        const dataAboutAccount = await this.dataAboutAccountsRepository
            .create({idAccount: createdAccount.id});
        const tokens = await this.authService.generateTokens(createdAccount);
        await this.authService.saveRefreshTokenById(createdAccount.id, tokens.refreshToken);
        return tokens;
    }

    async getAccountByPhone(phone: string) {
        const account = await this.accountsRepository
            .findOne({where: {phone: phone}, include: {all: true}});
        if (!account) {
            throw new TheAccountDoesNotExist();
        }
        return account;
    }

    async getAccountById(id: number) {
        const account = await this.accountsRepository
            .findByPk(id, {include: {all: true}});
        if (!account) {
            throw new TheAccountDoesNotExist();
        }
        return account;
    }

}
