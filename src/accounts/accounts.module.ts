import { forwardRef, Module } from "@nestjs/common";
import { AccountsService } from './accounts.service';
import { Account } from "./model/accounts.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountsController } from './accounts.controller';
import { DataAboutAccount } from "./model/data_about_accounts.model";
import { RolesModule } from "../roles/roles.module";

@Module({
  providers: [AccountsService],
  imports: [SequelizeModule.forFeature([Account, DataAboutAccount]), forwardRef(() => RolesModule) ],
  controllers: [AccountsController],
  exports: [AccountsService]
})
export class AccountsModule {}
