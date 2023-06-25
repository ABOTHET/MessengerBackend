import { HttpException, HttpStatus } from "@nestjs/common";

export class TheAccountDoesNotExist extends HttpException {
    constructor() {
        super('Этот аккаунт не существует...', HttpStatus.NOT_FOUND);
    }
}