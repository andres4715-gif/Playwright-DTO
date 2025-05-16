import { request, APIRequestContext, APIResponse } from '@playwright/test';
import { ApiError } from './api-error';

/**
 * Cliente HTTP para realizar peticiones a la API
 */
export class HttpClient {
  private context!: APIRequestContext;

  constructor(
    private readonly baseUrl: string,
    private readonly headers: Record<string, string> = {}
  ) {}

  /**
   * Inicializa el contexto de la API
   */
  async init(): Promise<void> {
    this.context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...this.headers,
      },
    });
  }

  /**
   * Cierra el contexto de la API
   */
  async close(): Promise<void> {
    await this.context.dispose();
  }

  /**
   * Realiza una petición GET
   */
  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const queryParams = params ? new URLSearchParams(params).toString() : '';
    const url = `${path}${queryParams ? '?' + queryParams : ''}`;

    const response = await this.context.get(url);

    if (!response.ok()) {
      const errorData = await this.getResponseData(response);
      throw this.createApiError(response, errorData);
    }

    return (await this.getResponseData(response)) as T;
  }

  /**
   * Realiza una petición POST
   */
  async post<T>(path: string, data?: any): Promise<T> {
    const response = await this.context.post(path, {
      data: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok()) {
      const errorData = await this.getResponseData(response);
      throw this.createApiError(response, errorData);
    }

    return (await this.getResponseData(response)) as T;
  }

  /**
   * Realiza una petición PUT
   */
  async put<T>(path: string, data?: any): Promise<T> {
    const response = await this.context.put(path, {
      data: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok()) {
      const errorData = await this.getResponseData(response);
      throw this.createApiError(response, errorData);
    }

    return (await this.getResponseData(response)) as T;
  }

  /**
   * Realiza una petición PATCH
   */
  async patch<T>(path: string, data?: any): Promise<T> {
    const response = await this.context.patch(path, {
      data: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok()) {
      const errorData = await this.getResponseData(response);
      throw this.createApiError(response, errorData);
    }

    return (await this.getResponseData(response)) as T;
  }

  /**
   * Realiza una petición DELETE
   */
  async delete<T>(path: string): Promise<T> {
    const response = await this.context.delete(path);

    if (!response.ok()) {
      const errorData = await this.getResponseData(response);
      throw this.createApiError(response, errorData);
    }

    return (await this.getResponseData(response)) as T;
  }

  /**
   * Crea un objeto de error de API
   */
  private createApiError(response: APIResponse, data?: any): ApiError {
    return new ApiError(
      `API responded with status ${response.status()} ${response.statusText()}`,
      response.status(),
      data
    );
  }

  /**
   * Obtiene los datos de la respuesta
   */
  private async getResponseData(response: APIResponse): Promise<any> {
    try {
      return await response.json();
    } catch (error) {
      return null;
    }
  }
}
