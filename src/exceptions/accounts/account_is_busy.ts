import { HttpException, HttpStatus } from "@nestjs/common";

export class AccountIsBusy extends HttpException {
    constructor() {
        super('Этот аккаунт уже занят...', HttpStatus.BAD_REQUEST);
    }
}