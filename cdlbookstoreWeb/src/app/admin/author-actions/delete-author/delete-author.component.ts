import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/shared/author.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { Author } from 'src/app/models/author.model';
import { FileSaveService } from 'src/app/shared/file-save.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from "lodash";

@Component({
    selector: 'app-delete-author',
    templateUrl: './delete-author.component.html',
    styleUrls: ['./delete-author.component.scss']
  })
  export class DeleteAuthorComponent implements OnInit {
  
    protected deleteAuthorForm: FormGroup = null;

    public authorControl: FormControl = new FormControl(null, [Validators.required]);
    public filteredAuthor: Observable<Author[]>;
    private selectedAuthor: Author;

    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private fileSaveService: FileSaveService, private spinner: NgxSpinnerService,  private toastr: ToastrService) {
    }
  
    ngOnInit() {
      this.onResetForm();
      this.setFilters();
    }

    public get authorList(): string[]  {
      return this._authorService.authorsName;
    }

    public get canSubmit(): boolean {
      return !_.isNil(this.selectedAuthor);
    }
  
    //region Events
    protected onSubmit(): void {
      const authorName: string = this.deleteAuthorForm.value.authorName;
      const author: Author = this._authorService.getAuthorByName(authorName);
      if (!author || this._authorService.isAuthorUsed(author)) {
        this.deleteAuthorForm.controls['authorName'].setErrors({'incorrect': true});
        this.toastr.error('This author is added to at least one book. You can not delete a author if is added to a book');
      } else {
        this.deleteAuthorRequest(author)
      }
    }
  
    protected onCancel(): void {
      this.deleteAuthorForm.reset();
    }

    protected onResetForm(): void {
      this.deleteAuthorForm = new FormGroup({
        'authorName': this.authorControl
      });
    }
    //endregion

    //region Requests
    private deleteAuthorRequest(author: Author): void {
      this.spinner.show();
      const succesMsg: string = 'The author: `' + author.name + '` was deleted';
      const errorMsg: string = 'An error occured. Please try again.'
      this._apiRequest.requst('DELETE', this._pathRequest.authorPath, author.id).subscribe((responseData: Author) => {
        if (author.photo) {
          this.fileSaveService.deleteFile(author.photo);
        }
        const index: number = this._authorService.authors.findIndex(el => el.name === responseData.name);
        this._authorService.authors.splice(index, 1);
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
    private filterAuthor(value: string): Author[] {
      if (_.isNil(value)) {
        return;
      }
      const filterValue = value.toLowerCase();
      if (this._authorService.hasValueByName(value)) {
          this.selectedAuthor = this._authorService.authors.filter(option => option.name.toLowerCase().includes(filterValue))[0];
      } else {
        this.selectedAuthor = undefined;
      }
      return this._authorService.authors.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    private setFilters(): void {
      this.filteredAuthor = this.authorControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this.filterAuthor(value))
      );
    }
    //#endregion
  }