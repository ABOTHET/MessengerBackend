import { Body, Controller, Post, SetMetadata } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/createRole.dto";
import { SetRoleDto } from "./dto/setRole.dto";
import { Roles } from "../decorators/roles/roles.decorator";

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @Post()
    @Roles('Admin')
    async createRole(@Body() createRole: CreateRoleDto) {
        await this.rolesService.createRole(createRole);
    }

    @Post('set')
    @Roles('Admin')
    async setRole(@Body() setRole: SetRoleDto) {
        await this.rolesService.setRole(setRole);
    }

}
