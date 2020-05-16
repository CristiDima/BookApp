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

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.scss']
  })
  export class AddBookComponent implements OnInit {
    @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
    @ViewChild('imageInput', {static: false}) imageInput: ElementRef;
    protected isOnAddPageMode: boolean = true;
    protected isOnRemovePageMode: boolean = false;
    public years: number[] = [];
  
    protected addbookForm: FormGroup = null;
    protected authors: string[] = [];
    protected selectedAuthors = new FormControl([Validators.required]);
    protected selectedGenres = new FormControl([Validators.required]);
    protected hasValue: boolean = false;
  
    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private _genreService: GenreService, private _bookService: BookService, public fb: FormBuilder,
                private cd: ChangeDetectorRef, private fileSaveService: FileSaveService, private spinner: NgxSpinnerService,
                private toastr: ToastrService) {
    }
  
    ngOnInit() {
      this.onResetForm();
      this.setYears();
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
      this.addbookForm.value.authorsName.forEach(element => {
        const author: Author = this._authorService.getAuthorByName(element);
        book.authors.push(author);
      });

      this.addbookForm.value.typesArray.forEach(element => {
        const type: Genre = this._genreService.getGenreByName(element);
        book.genres.push(type);
      });
  

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
        'authorsName': this.selectedAuthors,
        'typesArray': this.selectedGenres,
        'pages': new FormControl(0, [Validators.required,  Validators.pattern("^[0-9]*$")]),
        'year': new FormControl(0, [Validators.required]),
        'availableBooks': new FormControl(0, [Validators.required,  Validators.pattern("^[0-9]*$")]),
        'description': new FormControl('', [Validators.required]),
        'pdfFile': new FormControl(null, []),
        'img': new FormControl(null, [])
      });
    }
    //endregion

    //region Requests
    private getBooksRequest(): void {
      this.spinner.show();
      this._apiRequest.requst('GET', this._pathRequest.bookPath).subscribe((responseData: Book[]) => {
        this._bookService.books = responseData;
        this._bookService.getPhoto();
        this._bookService.getFile();
        this.isOnAddPageMode  = !this.isOnAddPageMode;
        this.isOnRemovePageMode = !this.isOnRemovePageMode;
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
  }