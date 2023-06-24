import { Body, Controller, Get, Post } from "@nestjs/common";
import { AccountDto } from "./dto/accounts.dto";
import { AccountsService } from "./accounts.service";

@Controller('accounts')
export class AccountsController {
    constructor(private accountService: AccountsService) {
    }
    @Post()
    async createAccount(@Body() dto: AccountDto) {
        await this.accountService.createAccount(dto);
        return "Пользователь успешно был создан...";
    }
    @Get()
    getAccounts() {
        return this.accountService.getAccounts();
    }

}
