import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountsModule } from "../accounts/accounts.module";
import { RefreshTokensModule } from "../refresh_tokens/refresh_tokens.module";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [forwardRef(() => AccountsModule), RefreshTokensModule],
  exports: [AuthService]
})
export class AuthModule {}
