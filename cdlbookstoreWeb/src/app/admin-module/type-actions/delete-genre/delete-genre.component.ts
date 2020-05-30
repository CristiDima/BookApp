import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenreService } from 'src/app/shared/genre.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { Genre } from 'src/app/models/genre.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from "lodash";

@Component({
    selector: 'app-delete-genre',
    templateUrl: './delete-genre.component.html',
    styleUrls: ['./delete-genre.component.scss']
  })
  export class DeleteGenreComponent implements OnInit {
  
    protected deleteGenreForm: FormGroup = null;

    public genreControl: FormControl = new FormControl(null, [Validators.required]);
    public filteredGenre: Observable<Genre[]>;
    private selectedGenre: Genre;
  
    constructor(private _genreService: GenreService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private spinner: NgxSpinnerService,  private toastr: ToastrService) {
    }
  
    ngOnInit() {
      this.onResetForm();
      this.setFilters();
    }

    public get genreList(): string[] {
      return this._genreService.genresName;
    }

    public get canSubmit(): boolean {
      return !_.isNil(this.selectedGenre);
    }
  
    //#region Events
    protected onSubmit(): void {
      if (!this.selectedGenre || this._genreService.isGenreUsed(this.selectedGenre)) {
        this.deleteGenreForm.controls['genreName'].setErrors({'incorrect': true});
        this.toastr.error('This genre is added to at least one book. You can not delete a genre if is added to a book');
      } else {
        this.deleteGenreRequest(this.selectedGenre);
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
    //#endregion

    //#region Requests
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
    //#endregion

    //#region filters
    private filterAuthor(value: string): Genre[] {
      if (_.isNil(value)) {
        return;
      }
      const filterValue = value.toLowerCase();
      if (this._genreService.hasValueByName(value)) {
          this.selectedGenre = this._genreService.genres.filter(option => option.name.toLowerCase().includes(filterValue))[0];
      } else {
        this.selectedGenre = undefined;
      }
      return this._genreService.genres.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    private setFilters(): void {
      this.filteredGenre = this.genreControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this.filterAuthor(value))
      );
    }
    //#endregion

  }