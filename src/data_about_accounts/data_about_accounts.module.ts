import { forwardRef, Module } from "@nestjs/common";
import { DataAboutAccountsService } from './data_about_accounts.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { DataAboutAccount } from "./models/data_about_accounts.model";
import { AccountsModule } from "../accounts/accounts.module";

@Module({
  providers: [DataAboutAccountsService],
  imports: [SequelizeModule.forFeature([DataAboutAccount]),
    forwardRef(() => AccountsModule)],
  exports: [DataAboutAccountsService]
})
export class DataAboutAccountsModule {}
