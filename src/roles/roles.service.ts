import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { RolesDto } from "./dto/roles.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./model/roles.model";
import { Relationship } from "./model/relationship.model";
import { TheRoleDoesNotExist } from "../exceptions/roles/the_role_does_not_exist";
import { RoleIsBusy } from "../exceptions/roles/role_is_busy";
import { AccountsService } from "../accounts/accounts.service";
import { TheAccountDoesNotExist } from "../exceptions/accounts/the_account_does_not_exist";
import { Account } from "../accounts/model/accounts.model";
import { TheRelationshipAlreadyExists } from "../exceptions/roles/the_relationship_already_exists";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private rolesModel: typeof Role,
                @InjectModel(Relationship) private relationshipModel: typeof Relationship,
                @Inject(forwardRef(() => AccountsService)) private accountsService: AccountsService) {
    }

    async createRole(dto: RolesDto) {
        const role = await Role.findOne({where: {role: dto.role}});
        if (role) {
            throw new RoleIsBusy();
        }
        await this.rolesModel.create(dto);
    }

    async getRoles() {
        return await this.rolesModel.findAll();
    }

    async assignARole(phone: string, roleName: string) {
        const role: Role = await Role.findOne({where: {role: roleName}});
        if (!role) {
            throw new TheRoleDoesNotExist();
        }
        const account: Account = await this.accountsService.getAccountByPhone(phone);
        if (!account) {
            throw new TheAccountDoesNotExist();
        }
        const checkingTheRelationship = await this.relationshipModel.findOne({where: {idAccount: account.id, idRole: role.id}});
        if (checkingTheRelationship) {
            throw new TheRelationshipAlreadyExists();
        }
        await this.relationshipModel.create({idAccount: account.id, idRole: role.id});
    }

}
