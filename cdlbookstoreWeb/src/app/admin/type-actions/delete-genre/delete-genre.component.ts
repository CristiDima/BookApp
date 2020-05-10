import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenreService } from 'src/app/shared/genre.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { Genre } from 'src/app/models/genre.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-delete-genre',
    templateUrl: './delete-genre.component.html',
    styleUrls: ['./delete-genre.component.scss']
  })
  export class DeleteGenreComponent implements OnInit {
    @Input() isOnAddPageMode: boolean;
    @Input() isOnRemovePageMode: boolean;
  
    protected deleteGenreForm: FormGroup = null;
    protected isGenreUsed: boolean = false;
  
    constructor(private _genreService: GenreService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private spinner: NgxSpinnerService,  private toastr: ToastrService) {
    }
  
    ngOnInit() {
      this.onResetForm();
    }

    public get genreList(): string[] {
      return this._genreService.genresName;
    }
  
    //region Events
    public onChangeMode(): void {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit(): void {
      const genreName: string = this.deleteGenreForm.value.genreName;
      const genre: Genre = this._genreService.getGenreByName(genreName);
      if (!genre || this._genreService.isGenreUsed(genre)) {
        this.deleteGenreForm.controls['genreName'].setErrors({'incorrect': true});
        this.isGenreUsed = true;
      } else {
        this.isGenreUsed = false;
        this.deleteGenreRequest(genre);
      }
    }

    public onCancel(): void {
      this.deleteGenreForm.reset();
    }
  
    private onResetForm() {
      this.deleteGenreForm = new FormGroup({
        'genreName': new FormControl(null, [Validators.required])
    });
    }
    //endregion

    //region Requests
    private getGenresRequest(): void {
      this.spinner.show();
      this._apiRequest.requst('GET', this._pathRequest.genrePath).subscribe((responseData: Genre[]) => {
          this._genreService.genres = responseData;
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
        });
    }

    private deleteGenreRequest(genre: Genre): void {
      const succesMsg: string = 'The genre: `' + genre.name + '` was deleted';
      const errorMsg: string = 'An error occured. Please try again.'
      this._apiRequest.requst('DELETE', this._pathRequest.genrePath, genre.id).subscribe((responseData: Genre) => {
        this.deleteGenreForm.reset();
        this.getGenresRequest();
        const index: number = this._genreService.genres.findIndex(el => el.name === responseData.name);
        this._genreService.genres.splice(index, 1);
        this.spinner.hide();
        this.toastr.success(succesMsg);
      }, error => {
        this.spinner.hide();
        this.toastr.error(errorMsg);
      });
    }
    //endregion

  }