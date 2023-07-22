import { Controller, Get, Param } from "@nestjs/common";
import { AssetsService } from "./assets.service";

@Controller('assets')
export class AssetsController {
    constructor(private assetsService: AssetsService) {}

    @Get("cities")
    getCities() {
        return this.assetsService.getCities();
    }

    @Get('cities/:id')
    getCityById(@Param('id') id: number) {
        return this.assetsService.getCityById(id);
    }

}
