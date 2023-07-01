import { forwardRef, Module } from "@nestjs/common";
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Account } from "./model/accounts.model";
import { DataAboutAccount } from "./model/dataAboutAccounts.model";
import { DataAboutAccountsService } from "./dataAboutAccounts.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [AccountsService, DataAboutAccountsService],
  controllers: [AccountsController],
  imports: [SequelizeModule.forFeature([Account, DataAboutAccount]), forwardRef(() => AuthModule)],
  exports: [AccountsService]
})
export class AccountsModule {}
