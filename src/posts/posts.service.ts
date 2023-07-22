import { Injectable, Req } from "@nestjs/common";
import { CreatePostDto } from "./dto/createPost.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./models/posts.model";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post) {}

    async createPost(createPost: CreatePostDto) {
        await this.postRepository.create(createPost);
    }

    async deletePost() {

    }

    async getPostById(id: number) {

    }

    async getPosts() {
        return await this.postRepository.findAll();
    }

    async getPostsFromAccountById(id: number) {

    }

}
