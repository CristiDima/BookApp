import { Author } from './author.model';
import { Genre } from './genre.model';

export class Book {
  public id: number;
  public name: string;
  public description: string;
  public rating: number;
  public votes: number;
  public authors: Author[] = [];
  public genres: Genre[] = [];
  public pages: number;
  public year: number;
  public file: string;
  public photo: string;

  public uiImage: File;
  public uiFile: File;
  public uiSelected: boolean = false;
}