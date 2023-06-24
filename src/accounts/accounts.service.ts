import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Account } from "./model/accounts.model";
import { AccountDto } from "./dto/accounts.dto";
import { AccountIsBusy } from "../exceptions/account_is_busy";
import * as bcrypt from "bcrypt";
import { DataAboutAccount } from "./model/data_about_accounts.model";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class AccountsService {
    constructor(@InjectModel(Account) private accountModel: typeof Account,
                @InjectModel(DataAboutAccount) private dataAboutAccount: typeof DataAboutAccount,
                private rolesService: RolesService) {
    }
    async getAccountById(id: number) {
        const account = await this.accountModel.findByPk(id, {include: {all: true}});
        return account;
    }
    async getAccountByPhone(phone: string) {
        const account = await this.accountModel.findOne({where: {phone: phone}, include: {all: true}});
        return account;
    }
    async getAccounts() {
        const accounts = await this.accountModel.findAll({include: {all: true}});
        return accounts;
    }
    async createAccount(dto: AccountDto) {
        const account = await this.getAccountByPhone(dto.phone);
        if (account) {
            throw new AccountIsBusy();
        }
        const hashPassword = await bcrypt.hash(dto.password, 3);
        const newDto = {...dto, password: hashPassword};
        const newAccount = await Account.create(newDto);
        await this.createDataAboutAccount(newAccount.id);
        await this.rolesService.assignARole(newAccount.id, "User");
    }
    private async createDataAboutAccount(idAccount: number) {
        await this.dataAboutAccount.create({ idAccount: idAccount })
    }

}
