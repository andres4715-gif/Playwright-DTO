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
  // Is better overwrite fromPlain, but use the base class correctly
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
