import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { Book } from 'src/app/models/book.model';
import { AuthorService as AuthorService } from 'src/app/shared/author.service';
import { GenreService } from 'src/app/shared/genre.service';
import { BookService } from 'src/app/shared/book.service';
import { Author } from 'src/app/models/author.model';
import { Genre } from 'src/app/models/genre.model';
import { FileSaveService } from 'src/app/shared/file-save.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { _ } from 'core-js';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.scss']
  })
export class AddBookComponent implements OnInit {
    @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
    @ViewChild('imageInput', {static: false}) imageInput: ElementRef;
    @ViewChild('selectValue', {static: false}) selectValue: ElementRef;
    public years: number[] = [];

    protected addbookForm: FormGroup = null;
    protected authors: string[] = [];
    protected hasValue = false;

    public filteredAuthors: Observable<Author[]>;
    public filteredGenres: Observable<Genre[]>;
    protected authorControl = new FormControl([], [Validators.required]);
    protected genreControl = new FormControl([], [Validators.required]);
    public selectedAuthors: Author[] = [];
    public selectedGenres: Genre[] = [];
    private lastAuthorFilter = '';
    private lastGenreFilter = '';

    constructor(private authorService: AuthorService, private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private genreService: GenreService, private bookService: BookService, public fb: FormBuilder,
                private cd: ChangeDetectorRef, private fileSaveService: FileSaveService, private spinner: NgxSpinnerService,
                private apiMessages: APIMessagesService) {
    }

    ngOnInit() {
      this.onInitForm();
      this.setYears();
      this.setFilters();
    }

    private setYears(): void {
      const currentYear: number = +(new Date()).getFullYear();
      for (let i = 0; i <= currentYear; i++) {
        this.years.push(i);
      }
    }

    public get authorsName(): string[] {
      return this.authorService.authorsName;
    }

    public get genresName(): string[] {
      return this.genreService.genresName;
    }

    public get uploadedFileName(): string {
      if (!this.fileInput || !this.fileInput.nativeElement) {
        return '';
      }
      const files: any[] = this.fileInput.nativeElement.files;
      if (files && files[0]) {
        return files[0].name;
      }

      return '';
    }

    public get uploadedImgName(): string {
      if (!this.imageInput || !this.imageInput.nativeElement) {
        return '';
      }
      const files: any[] = this.imageInput.nativeElement.files;
      if (files && files[0]) {
        return files[0].name;
      }

      return '';
    }

    //#region Events
    protected onChangeMode(): void {
      this.getBooksRequest();
    }

    protected onSubmit(form: FormGroupDirective): void {
      const book: Book = new Book();
      book.name = this.addbookForm.value.bookname;
      book.description = this.addbookForm.value.description;
      book.pages = this.addbookForm.value.pages;
      book.year = this.addbookForm.value.year;
      book.total = this.addbookForm.value.total;
      book.photo = this.addbookForm.value.img ? this.addbookForm.value.img.name : '';
      book.file = this.addbookForm.value.pdfFile ? this.addbookForm.value.pdfFile.name : '';
      book.authors = this.selectedAuthors;
      book.genres = this.selectedGenres;

      this.fileInput.nativeElement.files = null;
      this.imageInput.nativeElement.files = null;
      if (!book || this.bookService.hasValue(book)) {
        this.addbookForm.controls.bookname.setErrors({incorrect: true});
        this.hasValue = true;
      } else {
        this.hasValue = false;
        this.addBookRequest(book);
      }
    }

    protected onCancel(): void {
      this.addbookForm.reset();
      this.fileInput.nativeElement.value = '';
      this.imageInput.nativeElement.value = '';
      this.authorControl.reset();
      this.genreControl.reset();
      this.selectedGenres.forEach(el => {
        el.uiSelected = false;
      });
      this.selectedAuthors.forEach(el => {
        el.uiSelected = false;
      });
    }

    public onPdfFileChange(event): void {
      const reader = new FileReader();
      let fileToUpload: File = null;
      if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        fileToUpload = file;
        reader.onload = () => {
          this.addbookForm.patchValue({
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
          this.addbookForm.patchValue({
            img: fileToUpload
         });
          // need to run CD since file load runs outside of zone
          this.cd.markForCheck();
        };
      }
    }

    private onInitForm(): void {
      this.addbookForm = this.fb.group({
        bookname: new FormControl('', [Validators.required]),
        authorsName: this.authorControl,
        typesArray: this.genreControl,
        pages: new FormControl(0, [Validators.required,  Validators.pattern('^[0-9]*$')]),
        year: new FormControl(0, [Validators.required]),
        total: new FormControl(0, [Validators.required,  Validators.pattern('^[0-9]*$')]),
        description: new FormControl('', [Validators.required]),
        pdfFile: new FormControl(null, []),
        img: new FormControl(null, [])
      });
    }


    //#endregion

    //#region Requests
    private getBooksRequest(): void {
      this.spinner.show();
      this.apiRequest.requst('GET', this.pathRequest.bookPath).subscribe((responseData: Book[]) => {
        this.bookService.books = responseData;
        // this._bookService.getPhoto();
        // this._bookService.getFile();
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }

    private addBookRequest(book: Book): void {
      this.spinner.show();
      this.apiRequest.requst('POST', this.pathRequest.bookPath, book).subscribe((responseData: Book) => {
        if (this.addbookForm.value.pdfFile) {
          this.fileSaveService.uploadFile(this.addbookForm.value.pdfFile);
        }
        if (this.addbookForm.value.img) {
          this.fileSaveService.uploadFile(this.addbookForm.value.img);
        }
        this.bookService.books.push(responseData);
        this.onCancel();
        this.spinner.hide();
        this.apiMessages.onAddAuthorMsg(book);
      }, error => {
        this.spinner.hide();
        this.apiMessages.onAddAuthorMsg(error, true);
      });
    }
    //#endregion

    //#region filters
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
