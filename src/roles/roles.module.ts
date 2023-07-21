import { forwardRef, Module } from "@nestjs/common";
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./model/roles.model";
import { Relationship } from "./model/relationship.model";
import { AccountsModule } from "../accounts/accounts.module";
import { RefreshTokensModule } from "../refresh_tokens/refresh_tokens.module";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, Relationship]), forwardRef(() => AccountsModule), forwardRef(() => RefreshTokensModule)],
  exports: [RolesService]
})
export class RolesModule {}
