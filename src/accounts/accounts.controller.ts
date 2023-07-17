import { Body, Controller, forwardRef, Get, Inject, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { ICreateAccountDto } from "./dto/create_account.dto";
import { Response } from "express";
import { AuthGuard } from "../guards/auth/auth.guard";
import { DataAboutAccountsService } from "../data_about_accounts/data_about_accounts.service";
import { IChangeDataAboutAccount } from "../data_about_accounts/dto/change_data_about_accounts.model";

@Controller('accounts')
export class AccountsController {

    constructor(private accountsService: AccountsService,
                @Inject(forwardRef(() => DataAboutAccountsService)) private dataAboutAccountsService: DataAboutAccountsService) {}

    @Post()
    async createAccount(@Res({ passthrough: true }) res: Response, @Body() createAccount: ICreateAccountDto) {
        const tokens = await this.accountsService.createAccount(createAccount);
        res.cookie('refresh_token', tokens.refresh_token, {maxAge: 60 * 24 * 60 * 60, httpOnly: true});
        return {
            id: tokens.id,
            access_token: tokens.access_token
        }
    }

    @UseGuards(AuthGuard)
    @Get("/:id")
    async getAccountById(@Param("id") id: number) {
        return this.accountsService.getAccountById(id);
    }

    @UseGuards(AuthGuard)
    @Post("/:id")
    async changeDataAboutAccount(@Req() req, @Body() dataAboutAccount: IChangeDataAboutAccount) {
        await this.dataAboutAccountsService.changeDataAboutAccount(req.idAccount, dataAboutAccount);
    }

}
