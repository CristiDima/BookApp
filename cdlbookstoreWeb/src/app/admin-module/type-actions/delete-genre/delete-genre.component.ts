import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenreService } from 'src/app/shared/genre.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { Genre } from 'src/app/models/genre.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

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

    constructor(private genreService: GenreService, private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private spinner: NgxSpinnerService,  private apiMessage: APIMessagesService) {
    }

    ngOnInit() {
      this.onResetForm();
      this.setFilters();
    }

    public get genreList(): string[] {
      return this.genreService.genresName;
    }

    public get canSubmit(): boolean {
      return !_.isNil(this.selectedGenre);
    }

    //#region Events
    protected onSubmit(): void {
      if (!this.selectedGenre || this.genreService.isGenreUsed(this.selectedGenre)) {
        this.deleteGenreForm.controls.genreName.setErrors({incorrect: true});
        this.apiMessage.onExistGenreMsg();
      } else {
        this.deleteGenreRequest(this.selectedGenre);
      }
    }

    public onCancel(): void {
      this.deleteGenreForm.reset();
    }

    private onResetForm() {
      this.deleteGenreForm = new FormGroup({
        genreName: new FormControl(null, [Validators.required])
    });
    }
    //#endregion

    //#region Requests
    private getGenresRequest(): void {
      this.spinner.show();
      this.apiRequest.requst('GET', this.pathRequest.genrePath).subscribe((responseData: Genre[]) => {
          this.genreService.genres = responseData;
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
        });
    }

    private deleteGenreRequest(genre: Genre): void {
      this.apiRequest.requst('DELETE', this.pathRequest.genrePath, genre.id).subscribe((responseData: Genre) => {
        this.deleteGenreForm.reset();
        this.getGenresRequest();
        const index: number = this.genreService.genres.findIndex(el => el.name === responseData.name);
        this.genreService.genres.splice(index, 1);
        this.spinner.hide();
        this.apiMessage.onDeleteGenreMsg(genre);
      }, error => {
        this.spinner.hide();
        this.apiMessage.onDeleteGenreMsg(error, true);
      });
    }
    //#endregion

    //#region filters
    private filterAuthor(value: string): Genre[] {
      if (_.isNil(value)) {
        return;
      }
      const filterValue = value.toLowerCase();
      if (this.genreService.hasValueByName(value)) {
          this.selectedGenre = this.genreService.genres.filter(option => option.name.toLowerCase().includes(filterValue))[0];
      } else {
        this.selectedGenre = undefined;
      }
      return this.genreService.genres.filter(option => option.name.toLowerCase().includes(filterValue));
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
