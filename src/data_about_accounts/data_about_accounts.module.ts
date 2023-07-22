import { forwardRef, Module } from "@nestjs/common";
import { DataAboutAccountsService } from './data_about_accounts.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { DataAboutAccount } from "./models/data_about_accounts.model";
import { AccountsModule } from "../accounts/accounts.module";
import { AssetsModule } from "../assets/assets.module";

@Module({
  providers: [DataAboutAccountsService],
  imports: [SequelizeModule.forFeature([DataAboutAccount]),
    forwardRef(() => AccountsModule), AssetsModule],
  exports: [DataAboutAccountsService]
})
export class DataAboutAccountsModule {}
