import { BaseApiService } from '../../base-api.service';
import { UserDTO } from '../dtos/user.dto';
import { Logger } from '../utils/logger';

export class UserService extends BaseApiService {
  /**
   * Obtiene todos los usuarios
   */
  async getAllUsers(): Promise<UserDTO[]> {
    Logger.info('Obteniendo todos los usuarios');
    // Asegúrate de que este método se llame después de inicializar el servicio
    const response = await this.http.get<any[]>('/users');

    // La clave está en la anotación de tipo explícito
    return response.map((user): UserDTO => {
      // Forzamos el tipo de retorno para que TypeScript sepa que es UserDTO
      return UserDTO.fromPlain.call(UserDTO, user) as UserDTO;
    });
  }

  /**
   * Obtiene un usuario por su ID
   */
  async getUserById(id: number): Promise<UserDTO> {
    Logger.info(`Obteniendo usuario con ID: ${id}`);
    const response = await this.http.get<any>(`/users/${id}`);

    // Forzamos el tipo de retorno
    return UserDTO.fromPlain.call(UserDTO, response) as UserDTO;
  }
}
