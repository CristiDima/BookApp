import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author.model';
import { PagesRouting } from 'src/app/shared/pages-routing.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { AuthorService } from 'src/app/shared/author.service';

@Component({
    selector: 'app-addauthor',
    templateUrl: './add-author.component.html',
    styleUrls: ['./add-author.component.scss']
  })
  export class AddAuthorComponent implements OnInit {
    protected addAuthorForm: FormGroup = null;
    protected isOnAddPageMode: boolean = true;
    protected isOnRemovePageMode: boolean = false;

    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService,
                private _pathRequest: PathRequestService) {
    }
        
    ngOnInit() {
        this.addAuthorForm = new FormGroup({
            'authorname': new FormControl(null, [Validators.required]),
            'description': new FormControl(null, [Validators.required])
        });
    }

    public onChangeMode() {
        this.isOnAddPageMode  = !this.isOnAddPageMode;
        this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit() {
        const author: Author = new Author();
        author.name = this.addAuthorForm.value.authorname;
        author.description = this.addAuthorForm.value.description;
        this._apiRequest.requst('POST', this._pathRequest.authorPath, author).subscribe((responseData: Author) => {
            this._authorService.authors.push(responseData);
            this.addAuthorForm.reset();
        });
    }
    
    protected onCancel() {
        this.addAuthorForm.reset();
    }
  }