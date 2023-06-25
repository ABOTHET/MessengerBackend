import { Injectable } from '@nestjs/common';
import { AccountsService } from "../accounts/accounts.service";
import { TheAccountDoesNotExist } from "../exceptions/accounts/the_account_does_not_exist";
import { InjectModel } from "@nestjs/sequelize";
import { FriendRequest } from "./model/friend_requests.model";

@Injectable()
export class FriendRequestsService {

    constructor(private accountsService: AccountsService, @InjectModel(FriendRequest) private friendRequest: typeof FriendRequest) {
    }
    async createFriendRequest(dto: {phoneAccount: string, phoneFriend: string}) {
        const account = await this.accountsService.getAccountByPhone(dto.phoneAccount);
        if (!account) {
            throw new TheAccountDoesNotExist();
        }
        const friend = await this.accountsService.getAccountByPhone(dto.phoneFriend);
        if (!friend) {
            throw new TheAccountDoesNotExist();
        }
        await this.friendRequest.create({idAccount: account.id, idFriend: friend.id});
    }

}
