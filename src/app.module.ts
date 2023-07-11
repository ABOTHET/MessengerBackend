import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountsModule } from "./accounts/accounts.module";
import { Account } from "./accounts/model/accounts.model";
import { DataAboutAccount } from "./accounts/model/dataAboutAccounts.model";
import { AuthModule } from "./auth/auth.module";
import { RefreshToken } from "./auth/model/refreshTokens.model";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { PostsModule } from "./posts/posts.module";
import { Post } from "./posts/model/posts.model";

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
            models: [Account, DataAboutAccount, RefreshToken, Post],
            autoLoadModels: true,
            synchronize: true
        }),
        AccountsModule,
        AuthModule,
        PostsModule
    ],
    controllers: [],
    providers: []
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: '/accounts/*', method: RequestMethod.ALL })
    }
}
