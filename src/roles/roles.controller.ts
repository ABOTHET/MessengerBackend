import { Body, Controller, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/createRole.dto";
import { SetRoleDto } from "./dto/setRole.dto";
import { AuthGuard } from "../guards/auth/auth.guard";
import { RolesGuard } from "../guards/roles/roles.guard";

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @Post()
    @SetMetadata('roles', ['User'])
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    async createRole(@Body() createRole: CreateRoleDto) {
        await this.rolesService.createRole(createRole);
    }

    @Post('set')
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    async setRole(@Body() setRole: SetRoleDto) {
        await this.rolesService.setRole(setRole);
    }

}
