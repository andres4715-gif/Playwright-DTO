import { BaseDTO } from './base.dto';

export class PhotoDTO extends BaseDTO {
  id?: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;

  constructor(
    albumId: number = 0,
    title: string = '',
    url: string = '',
    thumbnailUrl: string = '',
    id?: number
  ) {
    super();
    this.albumId = albumId;
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
    this.id = id;
  }
}
