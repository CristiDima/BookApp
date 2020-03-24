import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/shared/author.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { Author } from 'src/app/models/author.model';

@Component({
    selector: 'app-deleteauthor',
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
  
    protected onSubmit() {
      const authorName: string = this.deleteAuthorForm.value.authorName;
      const author: Author = this._authorService.getAuthorByName(authorName);
        this._apiRequest.requst('DELETE', this._pathRequest.authorPath, author.id).subscribe((responseData: Author) => {
            this.deleteAuthorForm.reset();
            const index: number = this._authorService.authors.indexOf(responseData);
            this._authorService.authors.splice(index, 1);
            this.authorList = this._authorService.authorsName;
        });
    }
  
    protected onCancel() {
      console.log('test');
      this.deleteAuthorForm.reset();
    }
  
    protected onChangeMode() {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    private getInitialData(): void {
      this.authorList = this._authorService.authorsName;
    }
  }