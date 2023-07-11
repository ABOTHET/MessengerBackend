import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./model/posts.model";
import { CreatePostDto } from "./dto/createPost.dto";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postsRepository: typeof Post) {
    }

    async createPost(dto: CreatePostDto) {
        await this.postsRepository.create(dto);
    }

    async getPosts(idAccount: number) {
        const posts: Post[] = await this.postsRepository.findAll({where: {idAccount: idAccount}});
        return posts;
    }

}
