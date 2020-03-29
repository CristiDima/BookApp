import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenreService } from 'src/app/shared/genre.service';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { Genre } from 'src/app/models/genre.model';

@Component({
    selector: 'app-delete-genre',
    templateUrl: './delete-genre.component.html',
    styleUrls: ['./delete-genre.component.scss']
  })
  export class DeleteGenreComponent implements OnInit {
    @Input() isOnAddPageMode: boolean;
    @Input() isOnRemovePageMode: boolean;
  
    protected deleteGenreForm: FormGroup = null;
    protected genreList: string[] = [];
  
    constructor(private _genreService: GenreService, private _apiRequest: APIRequestService,
      private _pathRequest: PathRequestService) {
      this.getInitialData();
    }
  
    ngOnInit() {
      this.deleteGenreForm = new FormGroup({
          'genreName': new FormControl(null, [Validators.required])
      });
    }

    private getInitialData(): void {
      this.genreList = this._genreService.genresName;
    }
  
    //region Events
    public onChangeMode(): void {
      this.isOnAddPageMode  = !this.isOnAddPageMode;
      this.isOnRemovePageMode = !this.isOnRemovePageMode;
    }

    protected onSubmit(): void {
      const genreName: string = this.deleteGenreForm.value.genreName;
      const genre: Genre = this._genreService.getGenreByName(genreName);
      this.deleteGenreRequest(genre);
    }

    public onCancel(): void {
      this.deleteGenreForm.reset();
    }
  
    //endregion

    //region Requests
    private getGenresRequest(): void {
      this._apiRequest.requst('GET', this._pathRequest.genrePath).subscribe((responseData: Genre[]) => {
          this._genreService.genres = responseData;
          this.getInitialData();
        });
    }

    private deleteGenreRequest(genre: Genre): void {
      this._apiRequest.requst('DELETE', this._pathRequest.genrePath, genre.id).subscribe((responseData: Genre) => {
        this.deleteGenreForm.reset();
        this.getGenresRequest();
      });
    }
    //endregion

  }