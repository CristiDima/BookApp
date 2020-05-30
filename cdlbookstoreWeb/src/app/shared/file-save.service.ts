import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { Author } from '../models/author.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class FileSaveService {

    constructor(private fs: AngularFireStorage, private http: HttpClient, private spinner: NgxSpinnerService) {
    }

    public uploadFile(file: File): void {
        const fd = new FormData();
        fd.append('image', file, file.name);
        const storageRef: firebase.storage.Reference = this.fs.storage.ref(file.name);
        // tslint:disable-next-line: only-arrow-functions
        storageRef.put(file).then(function(snapshot) {
        }, error => {
          console.log('file not deleted');
        });
    }

    public deleteFile(fileName: string): void {
      const storageRef: firebase.storage.Reference = this.fs.storage.ref(fileName);
      storageRef.delete().then(file => {
        console.log('file uploaded');
      }, error => {
        console.log('not upload file');
      });
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
      }, error => {
        console.log('not found file');
      });
    }

    public getBookPdf(book: Book) {
      if (!book.file || book.file === '') {
        return;
      }
      const storageRef: firebase.storage.Reference = this.fs.storage.ref(book.file);
      this.spinner.show();
      storageRef.getDownloadURL().then(file => {
        if (file) {
          book.uiFile = file;
        }
        this.spinner.hide();
      }, error => {
        console.log('not found file');
        this.spinner.hide();
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
      }, error => {
        console.log('not found file');
      });
    }
}
