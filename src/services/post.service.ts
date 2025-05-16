import { BaseApiService } from '../../base-api.service';
import { PostDTO, CreatePostDTO, UpdatePostDTO } from '../dtos/post.dto';
import { Logger } from '../utils/logger';

/**
 * Servicio para interactuar con los endpoints de posts
 */
export class PostService extends BaseApiService {
  /**
   * Obtiene todos los posts
   */
  async getAllPosts(): Promise<PostDTO[]> {
    Logger.info('Obteniendo todos los posts');
    const response = await this.http.get<any[]>('/posts');

    // Usar cast explícito para forzar el tipo correcto
    return response.map((post): PostDTO => {
      return PostDTO.fromPlain.call(PostDTO, post) as PostDTO;
    });
  }

  /**
   * Obtiene un post por su ID
   */
  async getPostById(id: number): Promise<PostDTO> {
    Logger.info(`Obteniendo post con ID: ${id}`);
    const response = await this.http.get<any>(`/posts/${id}`);

    // Usar cast explícito
    return PostDTO.fromPlain.call(PostDTO, response) as PostDTO;
  }

  /**
   * Crea un nuevo post
   */
  async createPost(postData: CreatePostDTO): Promise<PostDTO> {
    Logger.info('Creando nuevo post', postData);
    // Asumiendo que http.post existe y está correctamente tipado
    const response = await this.http.post<any>('/posts', postData.toPlain());

    // Usar cast explícito
    return PostDTO.fromPlain.call(PostDTO, response) as PostDTO;
  }

  /**
   * Actualiza un post existente
   */
  async updatePost(id: number, postData: UpdatePostDTO): Promise<PostDTO> {
    Logger.info(`Actualizando post con ID: ${id}`, postData);
    // Asumiendo que http.put existe y está correctamente tipado
    const response = await this.http.put<any>(
      `/posts/${id}`,
      postData.toPlain()
    );

    // Usar cast explícito
    return PostDTO.fromPlain.call(PostDTO, response) as PostDTO;
  }

  /**
   * Actualiza parcialmente un post
   */
  async patchPost(id: number, postData: UpdatePostDTO): Promise<PostDTO> {
    Logger.info(`Actualizando parcialmente post con ID: ${id}`, postData);
    // Asumiendo que http.patch existe y está correctamente tipado
    const response = await this.http.patch<any>(
      `/posts/${id}`,
      postData.toPlain()
    );

    // Usar cast explícito
    return PostDTO.fromPlain.call(PostDTO, response) as PostDTO;
  }

  /**
   * Elimina un post
   */
  async deletePost(id: number): Promise<void> {
    Logger.info(`Eliminando post con ID: ${id}`);
    // Asumiendo que http.delete existe y está correctamente tipado
    await this.http.delete<any>(`/posts/${id}`);
  }

  /**
   * Obtiene los comentarios de un post
   */
  async getPostComments(postId: number): Promise<any[]> {
    Logger.info(`Obteniendo comentarios del post con ID: ${postId}`);
    return await this.http.get<any[]>(`/posts/${postId}/comments`);
  }
}
