import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/shared/author.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { Author } from 'src/app/models/author.model';
import { FileSaveService } from 'src/app/shared/file-save.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-delete-author',
    templateUrl: './delete-author.component.html',
    styleUrls: ['./delete-author.component.scss']
  })
  export class DeleteAuthorComponent implements OnInit {
    @Input() isOnAddPageMode: boolean;
    @Input() isOnRemovePageMode: boolean;
  
    protected deleteAuthorForm: FormGroup = null;
    protected isAuthorUsed: boolean = false;

    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private fileSaveService: FileSaveService, private spinner: NgxSpinnerService,  private toastr: ToastrService) {
    }
  
    ngOnInit() {
      this.onResetForm();
    }

    public get authorList(): string[]  {
      return this._authorService.authorsName;
    }
  
    //region Events
    protected onChangeMode(): void {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit(): void {
      const authorName: string = this.deleteAuthorForm.value.authorName;
      const author: Author = this._authorService.getAuthorByName(authorName);
      if (!author || this._authorService.isAuthorUsed(author)) {
        this.deleteAuthorForm.controls['authorName'].setErrors({'incorrect': true});
        this.isAuthorUsed = true;
      } else {
        this.isAuthorUsed = false;
        this.deleteAuthorRequest(author)
      }
    }
  
    protected onCancel(): void {
      this.deleteAuthorForm.reset();
    }

    protected onResetForm(): void {
      this.deleteAuthorForm = new FormGroup({
        'authorName': new FormControl(null, [Validators.required])
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
  }