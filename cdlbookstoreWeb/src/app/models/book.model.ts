import { Author } from './author.model';
import { Genre } from './genre.model';

export class Book {
  public id: number;
  public name: string;
  public description: string;
  public rating: number;  
  public authors: Author[] = [];
  public genres: Genre[] = [];
}