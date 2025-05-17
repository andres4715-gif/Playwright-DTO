import { BaseApiService } from '../../base-api.service';
import { UserDTO } from '../dtos/user.dto';
import { Logger } from '../utils/logger';

const endpoint = '/users';

export class UserService extends BaseApiService {
  /**
   * Get all users
   */
  async getAllUsers(): Promise<UserDTO[]> {
    Logger.info('--- Getting all the users');
    const response = await this.http.get<any[]>(endpoint);

    return response.map((user): UserDTO => {
      return UserDTO.fromPlain.call(UserDTO, user) as UserDTO;
    });
  }

  /**
   * Get the user by ID
   */
  async getUserById(id: number): Promise<UserDTO> {
    Logger.info(`--- Getting the user by ID: ${id}`);
    const response = await this.http.get<any>(`${endpoint}/${id}`);

    return UserDTO.fromPlain.call(UserDTO, response) as UserDTO;
  }
}
