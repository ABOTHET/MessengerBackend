import { Injectable } from '@nestjs/common';
import { RolesDto } from "./dto/roles.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./model/roles.model";
import { Account } from "../accounts/model/accounts.model";
import { Relationship } from "./model/relationship.model";
import { TheRoleDoesNotExist } from "../exceptions/the_role_does_not_exist";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleModel: typeof Role,
                @InjectModel(Relationship) private relationshipModel: typeof Relationship) {
    }

    async createRole(dto: RolesDto) {

    }

    async assignARole(idAccount: number, roleName: string) {
        const role = await Role.findOne({where: {role: roleName}});
        if (!role) {
            throw new TheRoleDoesNotExist();
        }
        await this.relationshipModel.create({idAccount: idAccount, idRole: role.id});
    }

}
