import { BaseApiService } from '../../base-api.service';
import { PostDTO, CreatePostDTO, UpdatePostDTO } from '../dtos/post.dto';
import { Logger } from '../utils/logger';

const endpoint = '/posts';
/**
 * Service to interact with the POSTS Endpoints
 */
export class PostService extends BaseApiService {
  /**
   * Get all posts
   */
  async getAllPosts(): Promise<PostDTO[]> {
    Logger.info('--- Getting all posts.');
    const response = await this.http.get<any[]>(endpoint);

    return response.map((post): PostDTO => {
      return PostDTO.fromPlain.call(PostDTO, post) as PostDTO;
    });
  }

  /**
   * Get Posts by ID
   */
  async getPostById(id: number): Promise<PostDTO> {
    Logger.info(`--- Getting post by ID: ${id}`);
    const response = await this.http.get<any>(`${endpoint}/${id}`);

    return PostDTO.fromPlain.call(PostDTO, response) as PostDTO;
  }

  /**
   * Make a new post
   */
  async createPost(postData: CreatePostDTO): Promise<PostDTO> {
    Logger.info('--- Making a new post: ', postData);
    const response = await this.http.post<any>(endpoint, postData.toPlain());

    return PostDTO.fromPlain.call(PostDTO, response) as PostDTO;
  }

  /**
   * Update an existing post
   */
  async updatePost(id: number, postData: UpdatePostDTO): Promise<PostDTO> {
    Logger.info(`--- Updating a post using his ID: ${id}`, postData);
    const response = await this.http.put<any>(
      `${endpoint}/${id}`,
      postData.toPlain()
    );

    return PostDTO.fromPlain.call(PostDTO, response) as PostDTO;
  }

  /**
   * Partial Post update
   */
  async patchPost(id: number, postData: UpdatePostDTO): Promise<PostDTO> {
    Logger.info(`--- Partial Update post ID: ${id}`, postData);
    const response = await this.http.patch<any>(
      `${endpoint}/${id}`,
      postData.toPlain()
    );

    return PostDTO.fromPlain.call(PostDTO, response) as PostDTO;
  }

  /**
   * Delete a post
   */
  async deletePost(id: number): Promise<void> {
    Logger.info(`--- Deleting post con ID: ${id}`);
    await this.http.delete<any>(`${endpoint}/${id}`);
  }

  /**
   * Gets the post comments
   */
  // TODO Check if this is working and necessary
  async getPostComments(postId: number): Promise<any[]> {
    Logger.info(`--- Getting post comment by ID: ${postId}`);
    return await this.http.get<any[]>(`${endpoint}/${postId}/comments`);
  }
}
