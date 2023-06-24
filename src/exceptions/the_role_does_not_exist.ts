import { HttpException, HttpStatus } from "@nestjs/common";

export class TheRoleDoesNotExist extends HttpException {
    constructor() {
        super('Этой роли не существует...', HttpStatus.NOT_FOUND);
    }
}