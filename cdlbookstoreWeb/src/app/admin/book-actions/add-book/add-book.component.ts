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

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.scss']
  })
export class AddBookComponent implements OnInit {
    @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
    @ViewChild('imageInput', {static: false}) imageInput: ElementRef;
    public years: number[] = [];
  
    protected addbookForm: FormGroup = null;
    protected authors: string[] = [];
    protected hasValue: boolean = false;

    public filteredAuthors: Observable<Author[]>;
    public filteredGenres: Observable<Genre[]>;
    protected authorControl = new FormControl([Validators.required]);
    protected genreControl = new FormControl([Validators.required]);
    public selectedAuthors: Author[] = [];
    public selectedGenres: Genre[] = [];
    private lastAuthorFilter: string = '';
    private lastGenreFilter: string = '';
  
    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private _genreService: GenreService, private _bookService: BookService, public fb: FormBuilder,
                private cd: ChangeDetectorRef, private fileSaveService: FileSaveService, private spinner: NgxSpinnerService,
                private toastr: ToastrService) {
    }
  
    ngOnInit() {
      this.onResetForm();
      this.setYears();
      this.setFilters();
    }

    private setYears(): void {
      const currentYear: number = +(new Date()).getFullYear();
      for(let i = 0; i <= currentYear; i++) {
        this.years.push(i);
      }
    }

    public get authorsName(): string[] {
      return this._authorService.authorsName;
    }

    public get genresName(): string[] {
      return this._genreService.genresName;
    }

    public get uploadedFileName(): string {
      if (!this.fileInput || !this.fileInput.nativeElement) {
        return '';
      }
      const files: any[] = this.fileInput.nativeElement.files;
      if(files && files[0]) {
        return files[0].name;
      }

      return '';
    }

    public get uploadedImgName(): string {
      if (!this.imageInput || !this.imageInput.nativeElement) {
        return '';
      }
      const files: any[] = this.imageInput.nativeElement.files;
      if(files && files[0]) {
        return files[0].name;
      }

      return '';
    }
  
    //region Events
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
  

      if (!book || this._bookService.hasValue(book)) {
        this.addbookForm.controls['bookname'].setErrors({'incorrect': true});
        this.hasValue = true;
      } else {
        this.hasValue = false;
        this.addBookRequest(book);
      }
    }
  
    protected onCancel(): void {
      this.addbookForm.reset();
    }

    public onPdfFileChange(event): void {
      const reader = new FileReader();
      let fileToUpload: File = null;
      if(event.target.files && event.target.files.length) {
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
      if(event.target.files && event.target.files.length) {
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

    private onResetForm(): void {
      this.addbookForm = this.fb.group({
        'bookname': new FormControl('', [Validators.required]),
        'authorsName': this.authorControl,
        'typesArray': this.genreControl,
        'pages': new FormControl(0, [Validators.required,  Validators.pattern("^[0-9]*$")]),
        'year': new FormControl(0, [Validators.required]),
        'total': new FormControl(0, [Validators.required,  Validators.pattern("^[0-9]*$")]),
        'description': new FormControl('', [Validators.required]),
        'pdfFile': new FormControl(null, []),
        'img': new FormControl(null, [])
      });
      this.authorControl = new FormControl(null, [Validators.required]);
      this.genreControl = new FormControl(null, [Validators.required]);
      this.lastAuthorFilter = '';
      this.lastGenreFilter = '';
      this.selectedAuthors.forEach(el => {
        el.uiSelected = false;
      });
      this.selectedGenres.forEach(el => {
        el.uiSelected = false;
      });
      this.setFilters();
    }
    //endregion

    //region Requests
    private getBooksRequest(): void {
      this.spinner.show();
      this._apiRequest.requst('GET', this._pathRequest.bookPath).subscribe((responseData: Book[]) => {
        this._bookService.books = responseData;
        this._bookService.getPhoto();
        this._bookService.getFile();
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }

    private addBookRequest(book: Book): void {
      this.spinner.show();
      const succesMsg: string = 'The book: `' + book.name + '` was added';
      const errorMsg: string = 'An error occured. Please try again.'
      this._apiRequest.requst('POST', this._pathRequest.bookPath, book).subscribe((responseData: Book) => {
        if (this.addbookForm.value.pdfFile) {
          this.fileSaveService.uploadFile(this.addbookForm.value.pdfFile);
        }
        if (this.addbookForm.value.img) {
          this.fileSaveService.uploadFile(this.addbookForm.value.img);
        }
        this._bookService.books.push(responseData);
        this.onResetForm();
        this.spinner.hide();
        this.toastr.success(succesMsg);
      }, error => {
        this.spinner.hide();
        this.toastr.error(errorMsg);
      });
    }
    //endregion

    //#region filters
    private filterAuthor(filter: string): Author[] {
      this.lastAuthorFilter = filter;
      if (filter) {
        return this._authorService.authors.filter(option => {
          return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
        })
      } else {
        return this._authorService.authors.slice();
      }
    }

    private filterGenre(filter: string): Genre[] {
      this.lastGenreFilter = filter;
      if (filter) {
        return this._genreService.genres.filter(option => {
          return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
        })
      } else {
        return this._genreService.genres.slice();
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
      console.log(this.authorControl);
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