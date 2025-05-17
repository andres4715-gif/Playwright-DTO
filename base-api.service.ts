import { HttpClient } from './src/utils/http-client';
import { Logger } from './src/utils/logger';

/**
 * Class for all API Services 
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
   * Initialize the service
   */
  async init(): Promise<void> {
    await this.http.init();
    Logger.info(`--- initialized ${this.constructor.name} Service`);
  }

  /**
   * Close the service 
   */
  async close(): Promise<void> {
    await this.http.close();
    Logger.info(`--- Close ${this.constructor.name} Service`);
  }
}
