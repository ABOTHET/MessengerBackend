import { HttpException, HttpStatus } from "@nestjs/common";

export class TheRelationshipAlreadyExists extends HttpException {
    constructor() {
        super('У данного аккаунта уже существует данная роль...', HttpStatus.NOT_FOUND);
    }
}