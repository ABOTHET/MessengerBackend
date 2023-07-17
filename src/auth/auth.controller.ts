import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { ICreateAccountDto } from "../accounts/dto/create_account.dto";
import { AuthGuard } from "../guards/auth/auth.guard";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Res({ passthrough: true }) res: Response, @Body() createAccount: ICreateAccountDto) {
        const tokens = await this.authService.login(createAccount);
        res.cookie('refreshToken', tokens.refresh_token, {maxAge: 60 * 24 * 60 * 60, httpOnly: true});
        return {
            id: tokens.id,
            access_token: tokens.access_token
        }
    }

    @UseGuards(AuthGuard)
    @Post("logout")
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        await this.authService.logout(req.cookies.refreshToken);
        res.clearCookie('refreshToken');
    }

    @UseGuards(AuthGuard)
    @Post("refresh")
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.refresh(req.cookies.refreshToken);
        res.cookie('refreshToken', tokens.refresh_token, {maxAge: 60 * 24 * 60 * 60, httpOnly: true});
    }

}
