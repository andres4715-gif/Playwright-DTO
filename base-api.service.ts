import { HttpClient } from './src/utils/http-client';
import { Logger } from './src/utils/logger';

/**
 * Clase base para todos los servicios de API
 */
export abstract class BaseApiService {
  protected http: HttpClient;

  constructor(
    baseUrl: string = 'https://jsonplaceholder.typicode.com',
    headers: Record<string, string> = {}
  ) {
    this.http = new HttpClient(baseUrl, headers);
  }

  /**
   * Inicializa el servicio
   */
  async init(): Promise<void> {
    await this.http.init();
    Logger.info(`Servicio ${this.constructor.name} inicializado`);
  }

  /**
   * Cierra el servicio
   */
  async close(): Promise<void> {
    await this.http.close();
    Logger.info(`Servicio ${this.constructor.name} cerrado`);
  }
}
