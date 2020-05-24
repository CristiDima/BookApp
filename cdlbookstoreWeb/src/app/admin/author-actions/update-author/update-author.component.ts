import { Component, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/shared/author.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileSaveService } from 'src/app/shared/file-save.service';
import * as _ from "lodash";
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'app-update-author',
    templateUrl: './update-author.component.html',
    styleUrls: ['./update-author.component.scss']
  })
  export class UpdateAuthorComponent implements OnInit {
    @ViewChild('imageInput', {static: false}) imageInput: ElementRef;
    protected updateAuthorForm: FormGroup = null;

    public authorControl: FormControl = new FormControl(null, [Validators.required]);
    public filteredAuthor: Observable<Author[]>;
    private selectedAuthor: Author;

    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private fileSaveService: FileSaveService, private spinner: NgxSpinnerService,  private toastr: ToastrService,
                private cd: ChangeDetectorRef) {

    }

    ngOnInit() {
      this.setFilters();
    }

    public get canSubmit(): boolean {
      return !_.isNil(this.selectedAuthor);
    }

    public get uploadedImgName(): string {
      if (!this.imageInput || !this.imageInput.nativeElement) {
        return this.selectedAuthor ? this.selectedAuthor.photo : '';
      }
      const files: any[] = this.imageInput.nativeElement.files;
      if(files && files[0]) {
        return files[0].name;
      }

      return this.selectedAuthor ? this.selectedAuthor.photo : '';
    }
  
    //region Events
    protected onSubmit(): void {
      this.selectedAuthor.name = this.updateAuthorForm.value.authorname;
      this.selectedAuthor.description = this.updateAuthorForm.value.description;
      this.selectedAuthor.photo = this.updateAuthorForm.value.img ? this.updateAuthorForm.value.img.name : '';
      this.updateAuthorRequest(this.selectedAuthor);
    }
  
    protected onCancel(): void {
      this.selectedAuthor = null;
    }

    protected onSetForm(): void {
      this.updateAuthorForm = new FormGroup({
        'authorname': new FormControl(this.selectedAuthor.name, [Validators.required]),
        'description': new FormControl(this.selectedAuthor.description, [Validators.required]),
        'img': new FormControl(null, [])
      });
    }

    public onImgFileChange(event): void {
      const reader = new FileReader();
      let fileToUpload: File = null;
      if(event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        fileToUpload = file;
        reader.onload = () => {
          this.updateAuthorForm.patchValue({
            img: fileToUpload
          });
        
          // need to run CD since file load runs outside of zone
          this.cd.markForCheck();
        };
      }
    }
    //endregion

    //region Requests
    private updateAuthorRequest(author: Author): void {
      this.spinner.show();
      const succesMsg: string = 'The author: `' + author.name + '` was deleted';
      const errorMsg: string = 'An error occured. Please try again.'
      this._apiRequest.requst('PUT', this._pathRequest.authorPath, author).subscribe((responseData: Author) => {
        if (this.updateAuthorForm.value.img) {
          this.fileSaveService.uploadFile(this.updateAuthorForm.value.img);
        }
        this.selectedAuthor = responseData
        this.selectedAuthor = null;
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
          this.onSetForm();
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
  }