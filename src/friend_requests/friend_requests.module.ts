import { Module } from '@nestjs/common';
import { FriendRequestsService } from './friend_requests.service';
import { FriendRequestsController } from './friend_requests.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { FriendRequest } from "./model/friend_requests.model";
import { AccountsModule } from "../accounts/accounts.module";

@Module({
  providers: [FriendRequestsService],
  controllers: [FriendRequestsController],
  imports: [SequelizeModule.forFeature([FriendRequest]), AccountsModule]
})
export class FriendRequestsModule {}
