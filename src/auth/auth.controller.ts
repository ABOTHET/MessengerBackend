import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAccountDto } from "../accounts/dto/createAccount.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response, Request } from "express";
import { Tokens } from "../accounts/accounts.controller";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: "Войти в аккаунт"})
    @ApiResponse({status: 200, type: Tokens})
    @Post("/login")
    async login(@Res({ passthrough: true }) res: Response, @Body() accountDto: CreateAccountDto) {
        const tokens = await this.authService.login(accountDto);
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 60 * 24 * 60 * 60, httpOnly: true});
        return tokens
    }

    @ApiOperation({summary: "Выйти из аккаунта"})
    @ApiResponse({status: 200})
    @Post("/logout")
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        await this.authService.logout(req.cookies.refreshToken);
        res.clearCookie('refreshToken');
        return "Выход был выполнен";
    }

    @ApiOperation({summary: "Обновить refreshToken"})
    @ApiResponse({status: 200, type: Tokens})
    @Post("/refresh")
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.refresh(req.cookies.refreshToken);
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 60 * 24 * 60 * 60, httpOnly: true});
        return tokens;
    }

}
