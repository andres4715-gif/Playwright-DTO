import { request, APIRequestContext, APIResponse } from '@playwright/test';
import { ApiError } from './api-error';

/**
 * HTTP client to make requests to the API
 */
export class HttpClient {
  private context!: APIRequestContext;

  constructor(
    private readonly baseUrl: string,
    private readonly headers: Record<string, string> = {}
  ) {}

  /**
   * Initialize the API context
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
   * Close the API context
   */
  async close(): Promise<void> {
    await this.context.dispose();
  }

  /**
   * Make a GET Request
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
   * Make a POST Request
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
   * Make a PUT Request
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
   * Make a PATCH Request
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
   * Make a DELETE Request
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
   * Make an API error object
   */
  private createApiError(response: APIResponse, data?: any): ApiError {
    return new ApiError(
      `API responded with status ${response.status()} ${response.statusText()}`,
      response.status(),
      data
    );
  }

  /**
   * Gets the response data
   */
  private async getResponseData(response: APIResponse): Promise<any> {
    try {
      return await response.json();
    } catch (error) {
      return null;
    }
  }
}
