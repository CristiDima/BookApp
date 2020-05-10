import { Injectable } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { Author } from '../models/author.model';

@Injectable()
export class FileSaveService {

    constructor(private fs: AngularFireStorage, private http: HttpClient){
    }
 
    public uploadFile(file: File): void {
        const fd = new FormData();
        fd.append('image', file, file.name);
        const storageRef: firebase.storage.Reference = this.fs.storage.ref(file.name);
        storageRef.put(file).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
        });
    }

    public deleteFile(fileName: string): void {
      const storageRef: firebase.storage.Reference = this.fs.storage.ref(fileName);
      storageRef.delete();
    }

    public getBookImg(book: Book) {
      if (!book.photo || book.photo === '') {
        return;
      }
      const storageRef: firebase.storage.Reference = this.fs.storage.ref(book.photo);
      storageRef.getDownloadURL().then(file => {
        if (file) {
          book.uiImage = file;
        }
      });
    }

    public getBookPdf(book: Book) {
      if (!book.photo || book.photo === '') {
        return;
      }
      const storageRef: firebase.storage.Reference = this.fs.storage.ref(book.file);
      storageRef.getDownloadURL().then(file => {
        if (file) {
          book.uiFile = file;
        }
      });
    }

    public getAuthorImg(author: Author) {
      if (!author.photo || author.photo === '') {
        return;
      }
      const storageRef: firebase.storage.Reference = this.fs.storage.ref(author.photo);
      storageRef.getDownloadURL().then(file => {
        if (file) {
          author.uiImage = file;
        }
      });
    }
}