
import { z } from 'zod';

  export const CreatePostSchema = z.object({
    id: z.string().uuid(),
    title: z.string().max(100),
    content: z.string().max(1000),
    authorId: z.string().uuid(),
  });

  export type CreatePostType = z.infer<typeof CreatePostSchema>;