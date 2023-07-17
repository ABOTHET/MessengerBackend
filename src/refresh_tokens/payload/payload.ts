import { Account } from "../../accounts/models/accounts.model";

export class Payload {

    id: number;
    phone: string;

    constructor(account: Account) {
        this.id = account.id;
        this.phone = account.phone;
    }

}