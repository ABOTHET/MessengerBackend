import { Account } from "../../accounts/model/accounts.model";

export class Payload {
    static getPayload(account: Account) {
        return {
            id: account.id,
            phone: account.phone
        };
    }
}