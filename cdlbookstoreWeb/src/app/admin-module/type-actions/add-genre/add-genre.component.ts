import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Genre } from 'src/app/models/genre.model';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { GenreService } from 'src/app/shared/genre.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

@Component({
    selector: 'app-add-genre',
    templateUrl: './add-genre.component.html',
    styleUrls: ['./add-genre.component.scss']
})
export class AddGenreComponent implements OnInit {
    protected addGenreForm: FormGroup = null;
    protected hasValue = false;

    constructor(private apiRequest: APIRequestService, private pathRequest: PathRequestService, private genreService: GenreService,
                private spinner: NgxSpinnerService, private apiMessage: APIMessagesService) {
    }

    ngOnInit() {
        this.onResetForm();
    }

    //#region events
    public onChangeMode(): void {
        this.getGenresRequest();
    }

    protected onSubmit(): void {
        const genre: Genre = new Genre();
        genre.name = this.addGenreForm.value.genre;
        genre.description = this.addGenreForm.value.description;
        if (!genre || this.genreService.hasValue(genre)) {
            this.addGenreForm.controls.genre.setErrors({incorrect: true});
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
            genre: new FormControl(null, [Validators.required]),
            description: new FormControl(null, [Validators.required])
        });
    }
    //#endregion

    //#region requests
    private getGenresRequest(): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.genrePath).subscribe((responseData: Genre[]) => {
            this.genreService.genres = responseData;
            this.spinner.hide();
        }, error => {
            this.spinner.hide();
        });
    }

    private addGenreRequest(genre: Genre): void {
        this.spinner.show();
        this.apiRequest.requst('POST', this.pathRequest.genrePath, genre).subscribe((responseData: Genre) => {
            this.genreService.genres.push(responseData);
            this.spinner.hide();
            this.apiMessage.onAddGenreMsg(genre);
            this.onCancel();
        }, error => {
            this.spinner.hide();
            this.apiMessage.onAddGenreMsg(error, true);
        });
    }
    //#endregion
}
