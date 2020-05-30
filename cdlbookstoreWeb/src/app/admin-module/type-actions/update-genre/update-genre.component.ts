import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from "lodash";
import { startWith, map } from 'rxjs/operators';
import { GenreService } from 'src/app/shared/genre.service';
import { Genre } from 'src/app/models/genre.model';

@Component({
    selector: 'app-update-genre',
    templateUrl: './update-genre.component.html',
    styleUrls: ['./update-genre.component.scss']
  })
  export class UpdateGenreComponent implements OnInit {
    protected updateGenreForm: FormGroup = null;

    public genreControl: FormControl = new FormControl(null, [Validators.required]);
    public filteredGenre: Observable<Genre[]>;
    private selectedGenre: Genre;

    constructor(private _genreService: GenreService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private spinner: NgxSpinnerService,  private toastr: ToastrService) {
    }

    ngOnInit() {
      this.setFilters();
    }

    public get canSubmit(): boolean {
      return !_.isNil(this.selectedGenre);
    }

  
    //#region Events
    protected onSubmit(): void {
      this.selectedGenre.name = this.updateGenreForm.value.genre;
      this.selectedGenre.description = this.updateGenreForm.value.description;
      this.updateGenreRequest(this.selectedGenre);
    }
  
    protected onCancel(): void {
      this.selectedGenre = null;
    }

    protected onSetForm(): void {
      this.updateGenreForm = new FormGroup({
        'genre': new FormControl(this.selectedGenre.name, [Validators.required]),
        'description': new FormControl(this.selectedGenre.description, [Validators.required])
      });
    }

    //#endregion

    //#region Requests
    private updateGenreRequest(genre: Genre): void {
      this.spinner.show();
      const succesMsg: string = 'The author: `' + genre.name + '` was updated';
      const errorMsg: string = 'An error occured. Please try again.'
      this._apiRequest.requst('PUT', this._pathRequest.genrePath, genre).subscribe((responseData: Author) => {
        this.selectedGenre = responseData
        this.selectedGenre = null;
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
          this.onSetForm();
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