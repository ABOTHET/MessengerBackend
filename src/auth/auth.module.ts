import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountsModule } from "../accounts/accounts.module";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { RefreshToken } from "./model/refreshTokens.model";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => AccountsModule), JwtModule, SequelizeModule.forFeature([RefreshToken])],
  exports: [AuthService]
})
export class AuthModule {}
