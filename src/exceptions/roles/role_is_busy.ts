import { HttpException, HttpStatus } from "@nestjs/common";

export class RoleIsBusy extends HttpException {
    constructor() {
        super('Эта роль уже занята...', HttpStatus.BAD_REQUEST);
    }
}