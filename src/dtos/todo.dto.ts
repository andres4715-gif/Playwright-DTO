import { BaseDTO } from './base.dto';

export class TodoDTO extends BaseDTO {
  id?: number;
  userId: number;
  title: string;
  completed: boolean;

  constructor(
    userId: number = 0,
    title: string = '',
    completed: boolean = false,
    id?: number
  ) {
    super();
    this.userId = userId;
    this.title = title;
    this.completed = completed;
    this.id = id;
  }
}
