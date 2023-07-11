import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { CreateAccountDto } from "./dto/createAccount.dto";
import { CreateDataAboutAccountDto } from "./dto/createDataAboutAccount.dto";
import { DataAboutAccountsService } from "./dataAboutAccounts.service";
import { ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";
import { DataAboutAccount } from "./model/dataAboutAccounts.model";

export class Tokens {
    @ApiProperty({example: "ufiiowufwejfuwguif.guiwuigiwef.iugiuiiiefwioe", description: "access_token"})
    accessToken: string;
    @ApiProperty({example: "oiewiofoiewhfoiwef.quwifiewfuwe.iugwwoiwefipew", description: "refresh_token"})
    refreshToken: string;
}

@Controller('accounts')
export class AccountsController {

    constructor(private accountsService: AccountsService, private dataAboutAccountsService: DataAboutAccountsService) {
    }

    @ApiOperation({summary: "Создать аккаунт"})
    @ApiResponse({status: 200, type: Tokens })
    @Post()
    async createAccount(@Res({ passthrough: true }) res: Response, @Body() accountDto: CreateAccountDto) {
        const tokens = await this.accountsService.createAccount(accountDto);
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 60 * 24 * 60 * 60, httpOnly: true});
        return tokens
    }

    @ApiOperation({summary: "Получить аккаунт и его данные по id"})
    @ApiResponse({status: 200, type: DataAboutAccount})
    @Get("/:id")
    async getAccountById(@Param('id') id: number) {
        const account = await this.accountsService.getDataAboutAccountById(id);
        return account;
    }

    @ApiOperation({summary: "Изменить данные аккаунта"})
    @ApiResponse({status: 200})
    @Post("/:id")
    async changeAccountDetails(@Param('id') id: number, @Body() dataAboutAccount: CreateDataAboutAccountDto) {
        const data = await this.dataAboutAccountsService.changeAccountDetails(id, dataAboutAccount);
        return {
            message: "Данные пользователя были успешно изменены"
        }
    }

}
