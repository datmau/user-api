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

  static async getAllPosts() {
    return await prisma.posts.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  }

  static async getPostById(id: string) {
    const post = await prisma.posts.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    return post;
  }
}