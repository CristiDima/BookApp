import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Genre } from 'src/app/models/genre.model';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { GenreService } from 'src/app/shared/genre.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-genre',
    templateUrl: './add-genre.component.html',
    styleUrls: ['./add-genre.component.scss']
  })
  export class AddGenreComponent implements OnInit {
    protected addGenreForm: FormGroup = null;
    protected hasValue: boolean = false;

    constructor(private _apiRequest: APIRequestService, private _pathRequest: PathRequestService, private _genreService: GenreService,
                private spinner: NgxSpinnerService, private toastr: ToastrService){
    }

    ngOnInit() {
        this.onResetForm();
    }

    //#region Events 
    public onChangeMode(): void {
        this.getGenresRequest();
    }

    protected onSubmit(): void {
        const genre: Genre = new Genre();
        genre.name = this.addGenreForm.value.genre;
        genre.description = this.addGenreForm.value.description;
        if (!genre || this._genreService.hasValue(genre)) {
            this.addGenreForm.controls['genre'].setErrors({'incorrect': true});
            this.hasValue = true;
        } else {
            this.hasValue = false;
            this.addGenreRequest(genre);
        }
    }
    
    protected onCancel(): void {
        this.addGenreForm.reset();
    }

    private onResetForm() {
        this.addGenreForm = new FormGroup({
            'genre': new FormControl(null, [Validators.required]),
            'description': new FormControl(null, [Validators.required])
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

    private addGenreRequest(genre: Genre): void {
        this.spinner.show();
        const succesMsg: string = 'The genre: `' + genre.name + '` was added.';
        const errorMsg: string = 'An error occured. Please try again.'
        this._apiRequest.requst('POST', this._pathRequest.genrePath, genre).subscribe((responseData: Genre) => {
            this._genreService.genres.push(responseData);
            this.spinner.hide();
            this.toastr.success(succesMsg);
            this.onCancel();
        }, error => {
            this.spinner.hide();
            this.toastr.error(errorMsg);
        });
    }
    //#endregion
  }