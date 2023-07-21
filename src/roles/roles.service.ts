import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./model/roles.model";
import { Relationship } from "./model/relationship.model";
import { AccountsService } from "../accounts/accounts.service";
import { CreateRoleDto } from "./dto/createRole.dto";
import { ThisRoleAlreadyExists } from "../exceptions/This_role_already_exists";
import { TheAccountDoesNotExist } from "../exceptions/The_account_does_not_exist";
import { SetRoleDto } from "./dto/setRole.dto";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role,
                @InjectModel(Relationship) private relationshipRepository: typeof Relationship,
                @Inject(forwardRef(() => AccountsService)) private accountsService: AccountsService) {}

    async createRole(createRole: CreateRoleDto) {
        const roleFromDB = await this.roleRepository.findOne({where: {role: createRole.role}});
        if (roleFromDB) {
            throw new ThisRoleAlreadyExists();
        }
        await this.roleRepository.create(createRole);
    }

    async setRole(setRole: SetRoleDto) {
        const roleFromDB = await this.roleRepository.findOne({where: {role: setRole.role}});
        if (!roleFromDB) {
            throw new ThisRoleAlreadyExists();
        }
        const accountFromDB = await this.accountsService.getAccountById(setRole.account_id);
        if (!accountFromDB) {
            throw new TheAccountDoesNotExist();
        }
        await accountFromDB.$set("roles", [roleFromDB.id]);
    }

}
