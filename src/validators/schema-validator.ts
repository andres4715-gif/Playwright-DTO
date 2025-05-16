// src/validators/schema-validator.ts
import { z } from 'zod';

export class SchemaValidator {
  static validate<T>(
    data: any,
    schema: z.ZodType<T>
  ): { success: boolean; data?: T; errors?: z.ZodError } {
    try {
      const validatedData = schema.parse(data);
      return { success: true, data: validatedData };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, errors: error };
      }
      throw error;
    }
  }
}
