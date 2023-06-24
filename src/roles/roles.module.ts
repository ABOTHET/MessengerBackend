import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "./model/roles.model";
import { Relationship } from "./model/relationship.model";

@Module({
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, Relationship])],
  exports: [RolesService]
})
export class RolesModule {}
