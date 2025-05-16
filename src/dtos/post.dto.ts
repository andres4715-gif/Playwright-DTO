import { BaseDTO } from './base.dto';

/**
 * PostDTO - Representa la estructura de datos de un post
 */
export class PostDTO extends BaseDTO {
  id?: number;
  userId: number;
  title: string;
  body: string;

  constructor(
    userId: number = 0,
    title: string = '',
    body: string = '',
    id?: number
  ) {
    super();
    this.userId = userId;
    this.title = title;
    this.body = body;
    this.id = id;
  }
}

/**
 * CreatePostDTO - DTO para la creación de un post (omite el ID que es generado por el servidor)
 */
export class CreatePostDTO extends BaseDTO {
  userId: number;
  title: string;
  body: string;

  constructor(userId: number = 0, title: string = '', body: string = '') {
    super();
    this.userId = userId;
    this.title = title;
    this.body = body;
  }
}

/**
 * UpdatePostDTO - DTO para actualización de un post (todas las propiedades son opcionales)
 */
export class UpdatePostDTO extends BaseDTO {
  userId?: number;
  title?: string;
  body?: string;

  constructor(data: { userId?: number; title?: string; body?: string } = {}) {
    super();
    this.userId = data.userId;
    this.title = data.title;
    this.body = data.body;
  }
}
