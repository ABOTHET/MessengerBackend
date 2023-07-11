import { Body, Controller, Get, Param, Post, Query, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Post as PostModel }  from "./model/posts.model";
import { CreatePostDto } from "./dto/createPost.dto";
import { Express } from 'express'
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) {
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async createPost(@Body() postDto: CreatePostDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        await this.postsService.createPost(postDto);
    }

    @Get()
    async getPosts(@Query('id') id: number) {
        const posts: PostModel[] = await this.postsService.getPosts(id);
        return posts;
    }

}
