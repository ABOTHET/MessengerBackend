import { Body, Controller, Post } from "@nestjs/common";
import { AccountDto } from "../accounts/dto/accounts.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post()
    login(@Body() dto: AccountDto) {
        return this.authService.login(dto);
    }

}
