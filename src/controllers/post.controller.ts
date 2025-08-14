import { Request, Response, NextFunction} from 'express';
import { PostService } from '../services/post.service';
import { CreatePostType } from '../dto/create-post.dto';


export class PostController {
    static async createPost(req: Request, res: Response, next: NextFunction) {
        const { title, content, authorId } = req.body;
        const postData = {
            title,
            content,
            authorId }
        const response = await PostService.createPost(postData as CreatePostType);
        res.status(201).json(response);
    }
}