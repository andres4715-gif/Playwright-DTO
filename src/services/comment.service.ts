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
   * Obtiene un comentario por su ID
   */
  async getCommentById(id: number): Promise<CommentDTO> {
    Logger.info(`Obteniendo comentario con ID: ${id}`);
    const response = await this.http.get<any>(`/comments/${id}`);

    // Forzamos explícitamente el tipo de retorno
    return CommentDTO.fromPlain.call(CommentDTO, response) as CommentDTO;
  }

  /**
   * Crea un nuevo comentario
   */
  async createComment(commentData: CreateCommentDTO): Promise<CommentDTO> {
    Logger.info('Creando nuevo comentario', commentData);
    const response = await this.http.post<any>(
      '/comments',
      commentData.toPlain()
    );

    // Forzamos explícitamente el tipo de retorno
    return CommentDTO.fromPlain.call(CommentDTO, response) as CommentDTO;
  }

  /**
   * Obtiene comentarios por post ID
   */
  async getCommentsByPostId(postId: number): Promise<CommentDTO[]> {
    Logger.info(`Obteniendo comentarios para el post con ID: ${postId}`);
    const response = await this.http.get<any[]>(`/posts/${postId}/comments`);

    // Forzamos explícitamente el tipo de retorno
    return response.map((comment): CommentDTO => {
      return CommentDTO.fromPlain.call(CommentDTO, comment) as CommentDTO;
    });
  }
}
