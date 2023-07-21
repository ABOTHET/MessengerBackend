import { Account } from "../../accounts/models/accounts.model";

export class PayloadToken {

    id: number;
    phone: string;
    roles: string[];

    constructor(account: Account) {
        this.id = account.id;
        this.phone = account.phone;
        this.roles = [];
        account.roles.forEach(role => this.roles.push(role.role));
    }

}