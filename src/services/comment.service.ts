import { BaseApiService } from '../../base-api.service';
import { CommentDTO, CreateCommentDTO } from '../dtos/comment.dto';
import { Logger } from '../utils/logger';

/**
 * Servicio para interactuar con los endpoints de comentarios
 */
export class CommentService extends BaseApiService {
  /**
   * Obtiene todos los comentarios
   */
  async getAllComments(): Promise<CommentDTO[]> {
    Logger.info('Obteniendo todos los comentarios');
    const response = await this.http.get<any[]>('/comments');

    // La clave está en forzar el tipo de retorno
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
