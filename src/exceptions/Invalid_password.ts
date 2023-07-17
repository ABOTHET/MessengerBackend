import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidPassword extends HttpException {
    constructor() {
        super('Неверный пароль', HttpStatus.BAD_REQUEST);
    }
}