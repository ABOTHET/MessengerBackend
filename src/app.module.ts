import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AccountsModule } from './accounts/accounts.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { Account } from "./accounts/models/accounts.model";
import { RefreshTokensModule } from './refresh_tokens/refresh_tokens.module';
import { RefreshToken } from "./refresh_tokens/models/refresh_tokens.model";
import { AuthModule } from './auth/auth.module';
import { DataAboutAccountsModule } from './data_about_accounts/data_about_accounts.module';
import { DataAboutAccount } from "./data_about_accounts/models/data_about_accounts.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Account, RefreshToken, DataAboutAccount],
            autoLoadModels: true,
            synchronize: true
        }),
        AccountsModule,
        RefreshTokensModule,
        AuthModule,
        DataAboutAccountsModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {

}
