import { Author } from './author.model';
import { Genre } from './genre.model';
import { Quiz } from './quiz.model';

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

  public loaned = 0;
  public total = 0;
  public quiz: Quiz[] = null;

  public uiImage: File;
  public uiFile: string;
  public uiSelected = false;

  public get available(): number {
    return this.total - this.loaned;
  }
}
