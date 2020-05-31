import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { Book } from 'src/app/models/book.model';
import { FileSaveService } from 'src/app/shared/file-save.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Author } from 'src/app/models/author.model';
import { Genre } from 'src/app/models/genre.model';
import { GenreService } from 'src/app/shared/genre.service';
import { AuthorService } from 'src/app/shared/author.service';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

@Component({
    selector: 'app-update-book',
    templateUrl: './update-book.component.html',
    styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {
    @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
    @ViewChild('imageInput', {static: false}) imageInput: ElementRef;
    public years: number[] = [];

    protected updateBookForm: FormGroup = null;

    public bookControl: FormControl = new FormControl(null, [Validators.required]);
    public filteredBook: Observable<Book[]>;
    private selectedBook: Book;

    public filteredAuthors: Observable<Author[]>;
    public filteredGenres: Observable<Genre[]>;
    protected authorControl = new FormControl(null, [Validators.required]);
    protected genreControl = new FormControl(null, [Validators.required]);
    public selectedAuthors: Author[] = [];
    public selectedGenres: Genre[] = [];
    private lastAuthorFilter = '';
    private lastGenreFilter = '';

    constructor(private bookService: BookService, private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private fileSaveService: FileSaveService, private spinner: NgxSpinnerService, private apiMessage: APIMessagesService,
                private genreService: GenreService, private authorService: AuthorService, private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.onResetForm();
        this.setFilters();
        this.setYears();
        this.setBookFilters();
    }

    private setYears(): void {
        const currentYear: number = +(new Date()).getFullYear();
        for (let i = 0; i <= currentYear; i++) {
          this.years.push(i);
        }
    }

    public get booksList(): string[] {
        return this.bookService.booksName;
    }

    public get canEdit(): boolean {
        return !_.isNil(this.selectedBook);
    }

    public get canSubmit(): boolean {
      return !_.isNil(this.selectedAuthors) && !_.isNil(this.selectedGenres);
    }

    public get uploadedFileName(): string {
        if (!this.fileInput || !this.fileInput.nativeElement) {
          return this.selectedBook ? this.selectedBook.file : '';
        }
        const files: any[] = this.fileInput.nativeElement.files;
        if (files && files[0]) {
          return files[0].name;
        }

        return this.selectedBook ? this.selectedBook.file : '';
    }

    public get uploadedImgName(): string {

        if (!this.imageInput || !this.imageInput.nativeElement) {
            return this.selectedBook ? this.selectedBook.photo : '';
        }
        const files: any[] = this.imageInput.nativeElement.files;
        if (files && files[0]) {
            return files[0].name;
        }

        return this.selectedBook ? this.selectedBook.photo : '';
    }

    //#region Events
    protected onSubmit(): void {
        this.selectedBook.name = this.updateBookForm.value.bookname;
        this.selectedBook.description = this.updateBookForm.value.description;
        this.selectedBook.pages = this.updateBookForm.value.pages;
        this.selectedBook.year = this.updateBookForm.value.year;
        this.selectedBook.total = this.updateBookForm.value.total;
        this.selectedBook.photo = this.updateBookForm.value.img ? this.updateBookForm.value.img.name : '';
        this.selectedBook.file = this.updateBookForm.value.pdfFile ? this.updateBookForm.value.pdfFile.name : '';
        this.selectedBook.authors = this.selectedAuthors;
        this.selectedBook.genres = this.selectedGenres;
        this.updateBookRequest(this.selectedBook);
      }

    public onCancel(): void {
      this.selectedBook = null;
    }

    private onResetForm(): void {
      if (!this.selectedBook) {
          return;
      }

      this.bookControl = new FormControl(null, [Validators.required]);
      this.onSetForm();

      this.authorControl = new FormControl([Validators.required]);
      this.genreControl = new FormControl([Validators.required]);
      this.lastAuthorFilter = '';
      this.lastGenreFilter = '';
      this.selectedAuthors.forEach(el => {
        el.uiSelected = false;
      });
      this.selectedGenres.forEach(el => {
        el.uiSelected = false;
      });
      this.setFilters();
      this.setBookFilters();
    }

    private onSetForm() {
        this.updateBookForm = new FormGroup({
            bookname: new FormControl(this.selectedBook.name, [Validators.required]),
            pages: new FormControl(this.selectedBook.pages, [Validators.required,  Validators.pattern('^[0-9]*$')]),
            year: new FormControl(this.selectedBook.year, [Validators.required]),
            total: new FormControl(this.selectedBook.total, [Validators.required,  Validators.pattern('^[0-9]*$')]),
            description: new FormControl(this.selectedBook.description, [Validators.required]),
            pdfFile: new FormControl(null, []),
            img: new FormControl(null, [])
        });
        this.selectedAuthors = this.selectedBook.authors;
        this.selectedGenres = this.selectedBook.genres;
        this.selectedBook.genres.forEach(genre => {
            const tempGenre: Genre = this.genreService.genres.filter(el => el.name === genre.name)[0];
            if (tempGenre) {
                tempGenre.uiSelected = true;
            }
        });
        this.selectedBook.authors.forEach(author => {
          const tempAuthor: Author = this.authorService.authors.filter(el => el.name === author.name)[0];
          if (tempAuthor) {
              tempAuthor.uiSelected = true;
          }
        });
        this.setFilters();
    }

    public onPdfFileChange(event): void {
        const reader = new FileReader();
        let fileToUpload: File = null;
        if (event.target.files && event.target.files.length) {
          const file = event.target.files[0];
          reader.readAsDataURL(file);
          fileToUpload = file;
          reader.onload = () => {
            this.updateBookForm.patchValue({
              pdfFile: fileToUpload
           });
            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
          };
        }
      }

      public onImgFileChange(event): void {
        const reader = new FileReader();
        let fileToUpload: File = null;
        if (event.target.files && event.target.files.length) {
          const file = event.target.files[0];
          reader.readAsDataURL(file);
          fileToUpload = file;
          reader.onload = () => {
            this.updateBookForm.patchValue({
              img: fileToUpload
           });
            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
          };
        }
    }
    //#endregion

    //#region Requests
    private updateBookRequest(book: Book): void {
        this.spinner.show();
        this.apiRequest.requst('PUT', this.pathRequest.bookPath, book).subscribe((responseData: Book) => {
          if (this.updateBookForm.value.pdfFile) {
            this.fileSaveService.uploadFile(this.updateBookForm.value.pdfFile);
          }
          if (this.updateBookForm.value.img) {
            this.fileSaveService.uploadFile(this.updateBookForm.value.img);
          }
          this.selectedBook = responseData;
          this.onResetForm();
          this.spinner.hide();
          this.apiMessage.onUpdateBookMsg(book);
        }, error => {
          this.spinner.hide();
          this.apiMessage.onUpdateBookMsg(error, true);
        });
    }
    //#endregion

    //#region filters
    private filterBook(value: string): Book[] {
      if (_.isNil(value)) {
        return;
      }
      const filterValue = value.toLowerCase();
      if (this.bookService.hasValueByName(value)) {
          this.selectedBook = this.bookService.books.filter(option => option.name.toLowerCase().includes(filterValue))[0];
          this.onSetForm();
      } else {
        this.selectedBook = undefined;
      }
      return this.bookService.books.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    private filterAuthor(filter: string): Author[] {
        this.lastAuthorFilter = filter;
        if (filter) {
          return this.authorService.authors.filter(option => {
            return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
          });
        } else {
          return this.authorService.authors.slice();
        }
      }

      private filterGenre(filter: string): Genre[] {
        this.lastGenreFilter = filter;
        if (filter) {
          return this.genreService.genres.filter(option => {
            return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
          });
        } else {
          return this.genreService.genres.slice();
        }
      }

      public displayFn(value: any[] | string): string | undefined {
        let displayValue: string;
        if (Array.isArray(value)) {
          value.forEach((displayVal, index) => {
            if (index === 0) {
              displayValue = displayVal.name;
            } else {
              displayValue += ', ' + displayVal.name;
            }
          });
        } else {
          displayValue = value;
        }
        return displayValue;
      }

      public optionClicked(event: Event, value: Book | Author | Genre): void {
        event.stopPropagation(); if (value instanceof Author) {
          this.toggleAuthorSelection(value);
        } else if (value instanceof Genre) {
          this.toggleGenreSelection(value);
        }
      }

      public toggleAuthorSelection(author: Author): void {
        author.uiSelected = !author.uiSelected;
        if (author.uiSelected) {
          this.selectedAuthors.push(author);
        } else {
          const i = this.selectedAuthors.findIndex(value => value.name === author.name);
          this.selectedAuthors.splice(i, 1);
        }

        this.authorControl.setValue(this.selectedAuthors);
      }

      public toggleGenreSelection(genre: Genre): void {
        genre.uiSelected = !genre.uiSelected;
        if (genre.uiSelected) {
          this.selectedGenres.push(genre);
        } else {
          const i = this.selectedGenres.findIndex(value => value.name === genre.name);
          this.selectedGenres.splice(i, 1);
        }

        this.genreControl.setValue(this.selectedGenres);
      }

      private setBookFilters(): void {
        this.filteredBook = this.bookControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this.filterBook(value))
        );
      }

      private setFilters(): void {
        this.filteredAuthors = this.authorControl.valueChanges.pipe(
          startWith<string | Author[]>(''),
          map(value => typeof value === 'string' ? value : this.lastAuthorFilter),
          map(filter => this.filterAuthor(filter))
        );
        this.filteredGenres = this.genreControl.valueChanges.pipe(
          startWith<string | Genre[]>(''),
          map(value => typeof value === 'string' ? value : this.lastGenreFilter),
          map(filter => this.filterGenre(filter))
        );
      }
    //#endregion
}
