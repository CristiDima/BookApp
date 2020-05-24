import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author.model';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { AuthorService } from 'src/app/shared/author.service';
import { FileSaveService } from 'src/app/shared/file-save.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-add-author',
    templateUrl: './add-author.component.html',
    styleUrls: ['./add-author.component.scss']
  })
  export class AddAuthorComponent implements OnInit {
    @ViewChild('imageInput', {static: false}) imageInput: ElementRef;
    protected addAuthorForm: FormGroup = null;
    protected isOnAddPageMode: boolean = true;
    protected isOnRemovePageMode: boolean = false;
    protected hasValue: boolean = false;

    constructor(private _authorService: AuthorService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private cd: ChangeDetectorRef, private fileSaveService: FileSaveService, private spinner: NgxSpinnerService,
                private toastr: ToastrService) {
    }
        
    ngOnInit() {
        this.onResetForm();
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

    //#region Events
    public onChangeMode(): void {
        this.getAuthorsRequest();
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

    public onImgFileChange(event): void {
        const reader = new FileReader();
        let fileToUpload: File = null;
        if(event.target.files && event.target.files.length) {
          const file = event.target.files[0];
          reader.readAsDataURL(file);
          fileToUpload = file;
          reader.onload = () => {
            this.addAuthorForm.patchValue({
              img: fileToUpload
            });
          
            // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
          };
        }
      }

      protected onCancel(): void {
        this.addAuthorForm.reset();
      }

      private onResetForm(): void {
        this.addAuthorForm = new FormGroup({
          'authorname': new FormControl(null, [Validators.required]),
          'description': new FormControl(null, [Validators.required]),
          'img': new FormControl(null, [])
      });
      }
      //#endregion

      //#region Requests
      private getAuthorsRequest(): void {
        this.spinner.show();
        this._apiRequest.requst('GET', this._pathRequest.authorPath).subscribe((responseData: Author[]) => {
          this._authorService.authors = responseData;
          this._authorService.getPhoto();
          this.isOnAddPageMode  = !this.isOnAddPageMode;
          this.isOnRemovePageMode = !this.isOnRemovePageMode;
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
        });
      }

      private addAuthorRequest(author: Author): void {
          this.spinner.show();
          const succesMsg: string = 'The author: `' + author.name + '` was added';
          const errorMsg: string = 'An error occured. Please try again.'
          this._apiRequest.requst('POST', this._pathRequest.authorPath, author).subscribe((responseData: Author) => {
            this.onResetForm();
              if (this.addAuthorForm.value.img) {
                this.fileSaveService.uploadFile(this.addAuthorForm.value.img);
              }
              this._authorService.authors.push(responseData);
              this.spinner.hide();
              this.toastr.success(succesMsg);
          }, error => {
            this.spinner.hide();
            this.toastr.error(errorMsg);
          });
      }
      //#endregion
  }