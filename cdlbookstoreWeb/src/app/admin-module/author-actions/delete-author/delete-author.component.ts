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
import * as _ from 'lodash';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

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

    constructor(private authorService: AuthorService, private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private fileSaveService: FileSaveService, private spinner: NgxSpinnerService,  private apiMessage: APIMessagesService) {
    }

    ngOnInit() {
      this.onResetForm();
      this.setFilters();
    }

    public get authorList(): string[]  {
      return this.authorService.authorsName;
    }

    public get canSubmit(): boolean {
      return !_.isNil(this.selectedAuthor);
    }

    //#region Events
    protected onSubmit(): void {
      const authorName: string = this.deleteAuthorForm.value.authorName;
      const author: Author = this.authorService.getAuthorByName(authorName);
      if (!author || this.authorService.isAuthorUsed(author)) {
        this.deleteAuthorForm.controls.authorName.setErrors({incorrect: true});
        this.apiMessage.onExistAuthorMsg();
      } else {
        this.deleteAuthorRequest(author);
      }
    }

    protected onCancel(): void {
      this.deleteAuthorForm.reset();
    }

    protected onResetForm(): void {
      this.deleteAuthorForm = new FormGroup({
        authorName: this.authorControl
      });
    }
    //#endregion

    //#region Requests
    private deleteAuthorRequest(author: Author): void {
      this.spinner.show();
      this.apiRequest.requst('DELETE', this.pathRequest.authorPath, author.id).subscribe((responseData: Author) => {
        if (author.photo) {
          this.fileSaveService.deleteFile(author.photo);
        }
        const index: number = this.authorService.authors.findIndex(el => el.name === responseData.name);
        this.authorService.authors.splice(index, 1);
        this.onResetForm();
        this.spinner.hide();
        this.apiMessage.onDeleteAuthorMsg(author);
      }, error => {
        this.spinner.hide();
        this.apiMessage.onDeleteAuthorMsg(error, true);
      });
    }
    //#endregion

    //#region filters
    private filterAuthor(value: string): Author[] {
      if (_.isNil(value)) {
        return;
      }
      const filterValue = value.toLowerCase();
      if (this.authorService.hasValueByName(value)) {
          this.selectedAuthor = this.authorService.authors.filter(option => option.name.toLowerCase().includes(filterValue))[0];
      } else {
        this.selectedAuthor = undefined;
      }
      return this.authorService.authors.filter(option => option.name.toLowerCase().includes(filterValue));
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
