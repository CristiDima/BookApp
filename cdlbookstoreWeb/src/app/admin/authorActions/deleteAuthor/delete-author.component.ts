import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/shared/author.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { Author } from 'src/app/models/author.model';

@Component({
    selector: 'app-delete-author',
    templateUrl: './delete-author.component.html',
    styleUrls: ['./delete-author.component.scss']
  })
  export class DeleteAuthorComponent implements OnInit {
    @Input() isOnAddPageMode: boolean;
    @Input() isOnRemovePageMode: boolean;
  
    protected deleteAuthorForm: FormGroup = null;
    protected authorList: string[] = [];

    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService,
                private _pathRequest: PathRequestService) {
      this.getInitialData();
    }
  
    ngOnInit() {
      this.deleteAuthorForm = new FormGroup({
        'authorName': new FormControl(null, [Validators.required])
      });
    }

    private getInitialData(): void {
      this.authorList = this._authorService.authorsName;
    }
  
    //region Events
    protected onChangeMode(): void {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit(): void {
      const authorName: string = this.deleteAuthorForm.value.authorName;
      const author: Author = this._authorService.getAuthorByName(authorName);
      this.deleteAuthorRequest(author)
    }
  
    protected onCancel(): void {
      this.deleteAuthorForm.reset();
    }
    //endregion

    //region Requests
    private getAuthorsRequest(): void {
      this._apiRequest.requst('GET', this._pathRequest.authorPath).subscribe((responseData: Author[]) => {
        this._authorService.authors = responseData;
        this.getInitialData();
      });
    }

    private deleteAuthorRequest(author: Author): void {
      this._apiRequest.requst('DELETE', this._pathRequest.authorPath, author.id).subscribe((responseData: Author) => {
        this.deleteAuthorForm.reset();
        this.getAuthorsRequest();
      });
    }
    //endregion
  }