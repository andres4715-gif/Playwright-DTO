export abstract class BaseDTO {
  /**
   * Convierte un objeto plano a una instancia del DTO
   */
  public static fromPlain<T extends BaseDTO>(
    this: new (...args: any[]) => T,
    plain: Record<string, any>
  ): T {
    if (!plain) {
      // Para evitar el error de tipo 'null is not assignable to type T'
      return null as unknown as T;
    }

    const instance = new this();

    // Asigna todas las propiedades del objeto plano a la instancia
    Object.keys(plain).forEach((key) => {
      if (plain[key] !== undefined) {
        (instance as any)[key] = plain[key];
      }
    });

    return instance;
  }

  /**
   * Convierte la instancia a un objeto plano
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
