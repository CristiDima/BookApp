import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookType } from 'src/app/models/type.model';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { TypeService } from 'src/app/shared/type.service';

@Component({
    selector: 'app-addtype',
    templateUrl: './add-type.component.html',
    styleUrls: ['./add-type.component.scss']
  })
  export class AddTypeComponent implements OnInit {
    protected addTypeForm: FormGroup = null;
    protected isOnAddPageMode: boolean = true;
    protected isOnRemovePageMode: boolean = false;

    constructor(private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private bookTypeService: TypeService){
    }

    ngOnInit() {
        this.addTypeForm = new FormGroup({
            'type': new FormControl(null, [Validators.required]),
            'description': new FormControl(null, [Validators.required])
        });
    }

    public onChangeMode() {
        this.isOnAddPageMode  = !this.isOnAddPageMode;
        this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit() {
        const bookType: BookType = new BookType();
        bookType.name = this.addTypeForm.value.type;
        bookType.description = this.addTypeForm.value.description;
        this._apiRequest.requst('POST', this._pathRequest.bookTypePath, bookType).subscribe((responseData: BookType) => {
            this.bookTypeService.types.push(responseData);
            this.addTypeForm.reset();
        });

    }
    
    protected onCancel() {
        this.addTypeForm.reset();
    }
  }