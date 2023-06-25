import { Body, Controller, Post } from "@nestjs/common";
import { FriendRequestsService } from "./friend_requests.service";
import { TheAccountDoesNotExist } from "../exceptions/accounts/the_account_does_not_exist";

@Controller('friendRequests')
export class FriendRequestsController {

    constructor(private friendRequestsService: FriendRequestsService) {
    }

    @Post()
    async createFriendRequest(@Body() dto: {phoneAccount: string, phoneFriend: string}) {
        await this.friendRequestsService.createFriendRequest(dto);
        return "Запрос на добавление в друзья был успешно послан...";
    }

}
