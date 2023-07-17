import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DataAboutAccount } from "./models/data_about_accounts.model";
import { InjectModel } from "@nestjs/sequelize";
import { IChangeDataAboutAccount } from "./dto/change_data_about_accounts.model";
import { AccountsService } from "../accounts/accounts.service";

@Injectable()
export class DataAboutAccountsService {
    constructor(@InjectModel(DataAboutAccount) private dataAboutAccountRepository: typeof DataAboutAccount,
                @Inject(forwardRef(() => AccountsService)) private accountsService: AccountsService) {}

    async createDataAboutAccount(id: number) {
        await this.dataAboutAccountRepository.create({account_id: id});
    }

    async changeDataAboutAccount(idAccount: number, dataAboutAccount: IChangeDataAboutAccount) {
        if (dataAboutAccount.city) {
            const city = await this.accountsService.getCityById(Number(dataAboutAccount.city));
            if (!city) {
                throw new HttpException("Такого города нет в списке", HttpStatus.BAD_REQUEST);
            }
            const newDAC = {...dataAboutAccount, city: city};
            await this.dataAboutAccountRepository.update(newDAC, {where: {account_id: idAccount}});
            return;
        }
        await this.dataAboutAccountRepository.update(dataAboutAccount, {where: {account_id: idAccount}});
    }

}
