import { forwardRef, Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { AccountsController } from './accounts.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Account } from "./models/accounts.model";
import { AuthModule } from "../auth/auth.module";
import { RefreshTokensModule } from "../refresh_tokens/refresh_tokens.module";
import { DataAboutAccountsModule } from "../data_about_accounts/data_about_accounts.module";

@Module({
    providers: [AccountsService],
    controllers: [AccountsController],
    imports: [SequelizeModule.forFeature([Account]), forwardRef(() => AuthModule),
        forwardRef(() => RefreshTokensModule), forwardRef(() => DataAboutAccountsModule)],
    exports: [AccountsService]
})
export class AccountsModule {}
