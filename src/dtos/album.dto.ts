import { BaseDTO } from './base.dto';

export class AlbumDTO extends BaseDTO {
  id?: number;
  userId: number;
  title: string;

  constructor(userId: number = 0, title: string = '', id?: number) {
    super();
    this.userId = userId;
    this.title = title;
    this.id = id;
  }
}
