import { BaseApiService } from '../../base-api.service';
import { CommentDTO, CreateCommentDTO } from '../dtos/comment.dto';
import { Logger } from '../utils/logger';

const endpoint = '/comments';

/**
 * Service to interact with the comment endpoints
 */
export class CommentService extends BaseApiService {
  /**
   * Get all the comments
   */
  async getAllComments(): Promise<CommentDTO[]> {
    Logger.info('--- Getting all the comments');
    const response = await this.http.get<any[]>(endpoint);

    // The key is to force the return type
    return response.map((comment): CommentDTO => {
      return CommentDTO.fromPlain.call(CommentDTO, comment) as CommentDTO;
    });
  }

  /**
   * Get comments by ID
   */
  async getCommentById(id: number): Promise<CommentDTO> {
    Logger.info(`--- Getting Comment ID: ${id}`);
    const response = await this.http.get<any>(`${endpoint}/${id}`);

    // Explicit force the return type
    return CommentDTO.fromPlain.call(CommentDTO, response) as CommentDTO;
  }

  /**
   * Making a new comment
   */
  async createComment(commentData: CreateCommentDTO): Promise<CommentDTO> {
    Logger.info('--- Making a new comment', commentData);
    const response = await this.http.post<any>(
      '/comments',
      commentData.toPlain()
    );

    // Explicitly Force the return type
    return CommentDTO.fromPlain.call(CommentDTO, response) as CommentDTO;
  }

  /**
   * Get the post ID Comments
   */
  async getCommentsByPostId(postId: number): Promise<CommentDTO[]> {
    Logger.info(`--- Get the Comment by postId: ${postId}`);
    const response = await this.http.get<any[]>(`/posts/${postId}${endpoint}`);

    // Explicity force the return type
    return response.map((comment): CommentDTO => {
      return CommentDTO.fromPlain.call(CommentDTO, comment) as CommentDTO;
    });
  }
}
