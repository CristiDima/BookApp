import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TypeService } from 'src/app/shared/type.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { BookType } from 'src/app/models/type.model';
import { Type } from '@angular/compiler';

@Component({
    selector: 'app-deletetype',
    templateUrl: './delete-type.component.html',
    styleUrls: ['./delete-type.component.scss']
  })
  export class DeleteTypeComponent implements OnInit {
    @Input() isOnAddPageMode: boolean;
    @Input() isOnRemovePageMode: boolean;
  
    protected deleteTypeForm: FormGroup = null;
    protected typeList: string[] = [];
  
    constructor(private _bookTypeService: TypeService, private _apiRequest: APIRequestService,
      private _pathRequest: PathRequestService) {
      this.getInitialData();
    }
  
    ngOnInit() {
      this.deleteTypeForm = new FormGroup({
          'typeName': new FormControl(null, [Validators.required])
      });
    }
  
    public onCancel() {
      this.deleteTypeForm.reset();
    }
  
    public onChangeMode() {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit() {
      const typeName: string = this.deleteTypeForm.value.typeName;
      const bookType: BookType = this._bookTypeService.getTypeByName(typeName);
        this._apiRequest.requst('DELETE', this._pathRequest.bookTypePath, bookType.id).subscribe((responseData: BookType) => {
            this.deleteTypeForm.reset();
            const index: number = this._bookTypeService.types.indexOf(responseData);
            this._bookTypeService.types.splice(index, 1);
            this.typeList = this._bookTypeService.typesName;
        });
    }

    private getInitialData(): void {
      this.typeList = this._bookTypeService.typesName;
    }
  }