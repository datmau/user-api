import { CreatePostType } from '../dto/create-post.dto';
import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';

export class PostService {
      static async createPost(data: CreatePostType) {
        const body = data;
        const post = await prisma.posts.create({ 
          data: { 
            ...body,
            authorId: data.authorId
          } 
        });
        return post
      }

}