import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { CorrectChoice, Quiz } from '../quiz.model';
import { BookService } from 'src/app/shared/book.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { startWith, map } from 'rxjs/operators';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';

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
    public questionIndex: number = 0;

    private questionChecked: boolean = false;

    public isCorrectChoiche: boolean = false;
    public isWrongChoice: boolean = false
    public message: string = '';

    public canStartQuiz: boolean = false;

    constructor(private bookService: BookService, private _apiRequest: APIRequestService, private _pathRequest: PathRequestService,
                private spinner: NgxSpinnerService, private toastr: ToastrService) {

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
            this.message = 'Your answer is correct. Congratulations'
            return;
        }

        if (this.selected.value === this.correctChoice.firstChoice) {
            this.isWrongChoice = true;
            this.message = 'Your answer is wrong. The correct answer is the first answer: `' +  this.question.firstChoice +'`';
        } else if (this.selected.value === this.correctChoice.secondChoice) {
            this.isWrongChoice = true;
            this.message = 'Your answer is wrong. The correct answer is the second answer: `' + this.question.secondChoice +'`';
        } else if (this.selected.value === this.correctChoice.thirdChoice) {
            this.isWrongChoice = true;
            this.message = 'Your answer is wrong. The correct answer is the third answer: `' + this.question.thirdChoice +'`';
        }
        else if (this.selected.value === this.correctChoice.fourthChoice) {
            this.isWrongChoice = true;
            this.message = 'Your answer is wrong. The correct answer is the fourth answer: `' + this.question.fourthChoice +'`';
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
        const warningMsg: string = 'For the book: `' + this.selectedBook.name + '` the quiz is not available.'
        this._apiRequest.requst('GET', this._pathRequest.quizPath + '/' + this.selectedBook.id).subscribe((responseData: Quiz[]) => {
          this.selectedBook.quiz = responseData;
          if (this.selectedBook.quiz.length === 0) {
            this.toastr.warning(warningMsg);
          } else {
            this.canStartQuiz = true;
            this.question = this.selectedBook.quiz[this.questionIndex];
          }
          this.spinner.hide();
        }, error => {
          this.selectedBook.quiz = [];
          this.toastr.warning(warningMsg);
          this.spinner.hide();
        });
    }
    //#endregion
}