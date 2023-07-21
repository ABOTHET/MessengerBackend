import { forwardRef, Module } from "@nestjs/common";
import { RefreshTokensService } from "./refresh_tokens.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { JwtModule } from "@nestjs/jwt";
import { AccountsModule } from "../accounts/accounts.module";
import { RefreshToken } from "./models/refresh_tokens.model";

@Module({
    providers: [RefreshTokensService],
    imports: [SequelizeModule.forFeature([RefreshToken]),
        JwtModule,
        forwardRef(() => AccountsModule),],
    exports: [RefreshTokensService]
})
export class RefreshTokensModule {}
