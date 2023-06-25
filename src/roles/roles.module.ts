import { forwardRef, Module } from "@nestjs/common";
import { RolesService } from './roles.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./model/roles.model";
import { Relationship } from "./model/relationship.model";
import { RolesController } from './roles.controller';
import { AccountsModule } from "../accounts/accounts.module";

@Module({
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, Relationship]), forwardRef(() => AccountsModule)],
  exports: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
