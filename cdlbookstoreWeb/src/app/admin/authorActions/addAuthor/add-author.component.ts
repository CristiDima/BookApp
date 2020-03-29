import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author.model';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { AuthorService } from 'src/app/shared/author.service';

@Component({
    selector: 'app-add-author',
    templateUrl: './add-author.component.html',
    styleUrls: ['./add-author.component.scss']
  })
  export class AddAuthorComponent implements OnInit {
    protected addAuthorForm: FormGroup = null;
    protected isOnAddPageMode: boolean = true;
    protected isOnRemovePageMode: boolean = false;
    protected hasValue: boolean = false;

    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService,
                private _pathRequest: PathRequestService) {
    }
        
    ngOnInit() {
        this.addAuthorForm = new FormGroup({
            'authorname': new FormControl(null, [Validators.required]),
            'description': new FormControl(null, [Validators.required])
        });
    }

    //region Events
    public onChangeMode(): void {
        this.isOnAddPageMode  = !this.isOnAddPageMode;
        this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit(): void {
        const author: Author = new Author();
        author.name = this.addAuthorForm.value.authorname;
        author.description = this.addAuthorForm.value.description;
        if (!author || this._authorService.hasValue(author)) {
            this.addAuthorForm.controls['authorname'].setErrors({'incorrect': true});
            this.hasValue = true;
        } else {
            this.hasValue = false;
            this.addAuthorRequest(author);
        }
    }
    
    protected onCancel(): void {
        this.addAuthorForm.reset();
    }
    //endregion

    //region Requests
    private getAuthorsRequest(): void {
        this._apiRequest.requst('GET', this._pathRequest.authorPath).subscribe((responseData: Author[]) => {
            this._authorService.authors = responseData;
          });
    }

    private addAuthorRequest(author: Author): void {
        this._apiRequest.requst('POST', this._pathRequest.authorPath, author).subscribe((responseData: Author) => {
            this.getAuthorsRequest();
            this.addAuthorForm.reset();
        });
    }
    //endregion
  }