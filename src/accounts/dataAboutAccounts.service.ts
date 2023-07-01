import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Account } from "./model/accounts.model";
import { DataAboutAccount } from "./model/dataAboutAccounts.model";
import { CreateDataAboutAccountDto } from "./dto/createDataAboutAccount.dto";
import { TheAccountDoesNotExist } from "./exceptions/theAccountDoesNotExist";

@Injectable()
export class DataAboutAccountsService {

    constructor(@InjectModel(DataAboutAccount) private dataAboutAccountsRepository: typeof DataAboutAccount,
                ) {
    }

    async changeAccountDetails(idAccount: number, dataAboutAccountDto: CreateDataAboutAccountDto) {
        const dataAboutAccount = await this.dataAboutAccountsRepository
            .findOne({where: {idAccount: idAccount}});
        if (!dataAboutAccount) {
            throw new TheAccountDoesNotExist();
        }
        await dataAboutAccount.update(dataAboutAccountDto);
    }

}