import { Author } from './author.model';
import { Genre } from './genre.model';

export class Book {
  public id: number = 1;
  public name: string = '';
  public description: string = ''
  public rating: number = 1;  
  public authors: Author[] = [];
  public genres: Genre[] = [];
}