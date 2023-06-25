import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountsModule } from './accounts/accounts.module';
import { Account } from "./accounts/model/accounts.model";
import { DataAboutAccount } from "./accounts/model/data_about_accounts.model";
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/model/roles.model";
import { Relationship } from "./roles/model/relationship.model";
import { FriendRequestsModule } from './friend_requests/friend_requests.module';
import { FriendRequest } from "./friend_requests/model/friend_requests.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`
        }),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Account, DataAboutAccount, Role, Relationship, FriendRequest],
            autoLoadModels: true,
            synchronize: true
        }),
        AccountsModule,
        AuthModule,
        RolesModule,
        FriendRequestsModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}
