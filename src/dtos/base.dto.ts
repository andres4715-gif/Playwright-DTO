export abstract class BaseDTO {
  /**
   * Convert a plane object to an instance of DTO
   */
  public static fromPlain<T extends BaseDTO>(
    this: new (...args: any[]) => T,
    plain: Record<string, any>
  ): T {
    if (!plain) {
      // To avoid the error type 'null is not assignable to type T'
      return null as unknown as T;
    }

    const instance = new this();

    // Assigns the all properties of the plane object to the instance
    Object.keys(plain).forEach((key) => {
      if (plain[key] !== undefined) {
        (instance as any)[key] = plain[key];
      }
    });

    return instance;
  }

  /**
   * Convert the instance to an object plane
   */
  public toPlain(): Record<string, any> {
    const result: Record<string, any> = {};

    Object.keys(this).forEach((key) => {
      if ((this as any)[key] !== undefined) {
        result[key] = (this as any)[key];
      }
    });

    return result;
  }
}
