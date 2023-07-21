import { HttpException, HttpStatus } from "@nestjs/common";

export class ThisRoleAlreadyExists extends HttpException {
    constructor() {
        super('Данная роль уже существует', HttpStatus.BAD_REQUEST);
    }
}