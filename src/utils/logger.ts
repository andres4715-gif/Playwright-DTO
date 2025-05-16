/**
 * Simple Utility to log messages
 */
export class Logger {
  static info(message: string, ...args: any[]): void {
    console.log(`[INFO] ${message}`, ...args);
  }

  static error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }

  static debug(message: string, ...args: any[]): void {
    // Manage process.env
    const isDebug =
      typeof process !== 'undefined' &&
      process.env &&
      process.env.DEBUG === 'true';

    if (isDebug) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  static request(method: string, url: string, body?: any): void {
    Logger.debug(`Request: ${method} ${url}`);
    if (body) {
      Logger.debug('Request body:', body);
    }
  }

  static response(status: number, body?: any): void {
    Logger.debug(`Response: ${status}`);
    if (body) {
      Logger.debug('Response body:', body);
    }
  }
}
