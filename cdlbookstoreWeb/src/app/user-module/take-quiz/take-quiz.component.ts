import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { CorrectChoice, Quiz } from '../../models/quiz.model';
import { BookService } from 'src/app/shared/book.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { startWith, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

@Component({
    selector: 'app-take-quiz',
    templateUrl: './take-quiz.component.html',
    styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit {
    public bookControl: FormControl = new FormControl(null, Validators.required);
    public filteredBook: Observable<Book[]>;
    private selectedBook: Book;

    public correctChoice = CorrectChoice;
    public selected: any = null;

    public question: Quiz = null;
    public questionIndex = 0;

    private questionChecked = false;

    public isCorrectChoiche = false;
    public isWrongChoice = false;
    public message = '';

    public canStartQuiz = false;

    constructor(private bookService: BookService, private apiRequest: APIRequestService, private pathRequest: PathRequestService,
                private spinner: NgxSpinnerService, private apiMessages: APIMessagesService) {

    }

    ngOnInit() {
        this.setFilters();
    }

    public get books(): Book[] {
        return this.bookService.books;
    }

    public get canShowContent(): boolean {
        return !_.isNil(this.selectedBook);
    }

    public get canGoToNextQuestion(): boolean {
        return !_.isNil(this.selected) && this.questionChecked;
    }

    public get isFinalQuestion(): boolean {
        return this.questionIndex === this.selectedBook.quiz.length - 1;
    }

    public choice(index: number): string {
        if (index === 0) {
            return this.question.firstChoice;
        } else if (index === 1) {
            return this.question.secondChoice;
        } else if (index === 2) {
            return this.question.thirdChoice;
        } else if (index === 3) {
            return this.question.fourthChoice;
        }
    }

    //#region events
    public onStartQuiz(): void {
        if (!this.selectedBook.quiz || this.selectedBook.quiz.length === 0) {
            this.getQuiz();
        } else {
            this.canStartQuiz = true;
            this.question = this.selectedBook.quiz[this.questionIndex];
        }
    }

    public onCheckQuestion(): void {
        this.questionChecked = true;
        if (this.question.correctChoice ===  this.selected.value) {
            this.isCorrectChoiche = true;
            this.message = 'Raspunsul selectat este corect. Felicitari';
            return;
        }

        if (this.selected.value === this.correctChoice.firstChoice) {
            this.isWrongChoice = true;
            this.message = 'Raspunsul este gresit. Raspunsul corect este: `' +  this.question.firstChoice + '`';
        } else if (this.selected.value === this.correctChoice.secondChoice) {
            this.isWrongChoice = true;
            this.message = 'Raspunsul este gresit. Raspunsul corect este: `' + this.question.secondChoice + '`';
        } else if (this.selected.value === this.correctChoice.thirdChoice) {
            this.isWrongChoice = true;
            this.message = 'Raspunsul este gresit. Raspunsul corect este: `' + this.question.thirdChoice + '`';
        } else if (this.selected.value === this.correctChoice.fourthChoice) {
            this.isWrongChoice = true;
            this.message = 'Raspunsul este gresit. Raspunsul corect este: `' + this.question.fourthChoice + '`';
        }

    }

    public onNextQuestion(): void {
        this.questionIndex++;
        this.question = this.selectedBook.quiz[this.questionIndex];
        this.selected = null;
        this.correctChoice = CorrectChoice;
        this.questionChecked = false;
        this.onResetCSS();
    }

    public onFinishQuiz(): void {
        this.canStartQuiz = false;
        this.question = null;
        this.questionIndex = 0;
        this.selectedBook = null;
        this.onResetCSS();
    }

    private onResetCSS(): void {
        this.isCorrectChoiche = false;
        this.isWrongChoice = false;
    }
    //#endregion

     //#region filters
    private filterBook(value: string): Book[] {
        if (_.isNil(value)) {
            return;
        }
        const filterValue = value.toLowerCase();
        if (this.bookService.hasValueByName(value)) {
            this.selectedBook = this.books.filter(option => option.name.toLowerCase().includes(filterValue))[0];
        } else {
            this.selectedBook = undefined;
        }
        return this.books.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    private setFilters(): void {
        this.filteredBook = this.bookControl.valueChanges
        .pipe(
            startWith(''),
            map(value => this.filterBook(value))
        );
    }
    //#endregion

    //#region requests
    protected getQuiz(): void {
        this.spinner.show();
        this.apiRequest.requst('GET', this.pathRequest.quizPath + '/' + this.selectedBook.id).subscribe((responseData: Quiz[]) => {
          this.selectedBook.quiz = responseData;
          if (this.selectedBook.quiz.length === 0) {
            this.apiMessages.onInvalidQuizMsg();
          } else {
            this.canStartQuiz = true;
            this.question = this.selectedBook.quiz[this.questionIndex];
          }
          this.spinner.hide();
        }, error => {
          this.selectedBook.quiz = [];
          this.apiMessages.onInvalidQuizMsg();
          this.spinner.hide();
        });
    }
    //#endregion
}
