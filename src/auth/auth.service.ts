import { Injectable } from '@nestjs/common';
import { AccountsService } from "../accounts/accounts.service";
import { AccountDto } from "../accounts/dto/accounts.dto";
import { TheAccountDoesNotExist } from "../exceptions/accounts/the_account_does_not_exist";
import * as bcrypt from "bcrypt";
import { Account } from "../accounts/model/accounts.model";
import { IncorrectData } from "../exceptions/accounts/incorrect_data";

@Injectable()
export class AuthService {

    constructor(private accountsService: AccountsService) {
    }

    async login(dto: AccountDto) {
        const account: Account = await this.accountsService.getAccountByPhone(dto.phone);
        if (!account) {
            throw new TheAccountDoesNotExist();
        }
        const passwordComparison = await bcrypt.compare(dto.password, account.password);
        if (passwordComparison) {
            return "Вход был выполнен...";
        }
        throw new IncorrectData();
    }

}
