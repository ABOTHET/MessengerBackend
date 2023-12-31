import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Post } from "./models/posts.model";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
  imports: [SequelizeModule.forFeature([Post])]
})
export class PostsModule {}
