import { HttpException, HttpStatus } from "@nestjs/common";

export class ThePhoneIsAlreadyBusy extends HttpException {
    constructor() {
        super('Данный телефон уже занят', HttpStatus.BAD_REQUEST);
    }
}