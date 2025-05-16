import { BaseDTO } from './base.dto';

export class CommentDTO extends BaseDTO {
  id?: number;
  postId: number;
  name: string;
  email: string;
  body: string;

  constructor(
    postId: number = 0,
    name: string = '',
    email: string = '',
    body: string = '',
    id?: number
  ) {
    super();
    this.postId = postId;
    this.name = name;
    this.email = email;
    this.body = body;
    this.id = id;
  }

  // Es mejor no sobrescribir fromPlain, sino usar correctamente el de la clase base
}

export class CreateCommentDTO extends BaseDTO {
  postId: number;
  name: string;
  email: string;
  body: string;

  constructor(
    postId: number = 0,
    name: string = '',
    email: string = '',
    body: string = ''
  ) {
    super();
    this.postId = postId;
    this.name = name;
    this.email = email;
    this.body = body;
  }
}
