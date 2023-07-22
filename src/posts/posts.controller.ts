import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/createPost.dto";

@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) {}

    @Get()
    getPosts() {
        return this.postsService.getPosts();
    }

    @Post()
    async createPost(@Body() createPost: CreatePostDto, @Req() req) {
        createPost.account_id = req.tokenAccess.id;
        await this.postsService.createPost(createPost);
    }
}
