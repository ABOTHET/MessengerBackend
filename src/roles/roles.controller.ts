import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesDto } from "./dto/roles.dto";
import { RolesService } from "./roles.service";

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {
    }

    @Post()
    async createRole(@Body() dto: RolesDto) {
        await this.rolesService.createRole(dto);
        return "Роль была создана...";
    }

    @Get()
    async getRoles() {
        return await this.rolesService.getRoles();
    }

    @Post("assign")
    async assignARole(@Body() dto: { phone: string, role: string }) {
        await this.rolesService.assignARole(dto.phone, dto.role);
        return "Роль была успешно привязана...";
    }


}
