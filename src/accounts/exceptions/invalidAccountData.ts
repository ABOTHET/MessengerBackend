import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidAccountData extends HttpException {
    constructor() {
        super('Неверные данные аккаунта', HttpStatus.BAD_REQUEST);
    }
}