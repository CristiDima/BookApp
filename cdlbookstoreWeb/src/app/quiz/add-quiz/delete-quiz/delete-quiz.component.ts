import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { Book } from 'src/app/models/book.model';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from "lodash";
import { Quiz, CorrectChoice } from '../../quiz.model';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { APIRequestService } from 'src/app/shared/api-request.service';

@Component({
    selector: 'app-delete-quiz',
    templateUrl: './delete-quiz.component.html',
    styleUrls: ['./delete-quiz.component.scss']
})
export class DeleteQuizComponent implements OnInit {
    public bookControl: FormControl = new FormControl(null, Validators.required);
    public filteredBook: Observable<Book[]>;
    private selectedBook: Book;

    public quizControl: FormControl = new FormControl(null, Validators.required);
    public filteredQuiz: Observable<Quiz[]>;
    private selectedQuiz: Quiz;
    
    constructor(private bookService: BookService, public fb: FormBuilder, private _apiRequest: APIRequestService,
                private _pathRequest: PathRequestService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
    }

    ngOnInit() {
      this.setFilters();
    }

    public get books(): Book[] {
        return this.bookService.books;
    }

    public get canShowContent(): boolean {
      return !_.isNil(this.selectedQuiz);
    }

    public get canShowQuestions(): boolean {
        return !_.isNil(this.selectedBook);
      }


    //#region events
    protected onDelete(): void {
        this.spinner.show();
        const successMsg: string = 'You deleted a question for the book: `' + this.selectedBook.name + '`'
        const errorMsg: string = 'An error occured. The question was not saved. Please try again';
        this._apiRequest.requst('DELETE', this._pathRequest.quizPath, this.selectedQuiz.id)
        .subscribe((responseData: Quiz) => {
          if (responseData) {
            const index: number = this.selectedBook.quiz.indexOf(this.selectedQuiz);
              this.selectedBook.quiz.splice(index, 1);
          }
          this.spinner.hide();
          this.toastr.success(successMsg);
        }, error => {
          this.spinner.hide();
          this.toastr.error(errorMsg);
        });
    }

    protected onCancel(): void {
        this.selectedBook = null;
        this.selectedQuiz = null;
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
            if (_.isNil(this.selectedBook.quiz)) {
            this.getQuiz();
            }
        } else {
        this.selectedBook = undefined;
        }
        return this.books.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    private filterQuiz(value: string): Quiz[] {
        if (_.isNil(value) || _.isNil(this.selectedBook) || _.isNil(this.selectedBook.quiz)) {
        return;
        }
        const filterValue = value.toLowerCase();
        if (this.bookService.hasQuizByName(value, this.selectedBook)) {
            this.selectedQuiz = this.selectedBook.quiz.filter(option => option.question.toLowerCase().includes(filterValue))[0];
        } else {
        this.selectedQuiz = undefined;
        }
        return this.selectedBook.quiz.filter(option => option.question.toLowerCase().includes(filterValue));
    }

    private setFilters(): void {
        this.filteredBook = this.bookControl.valueChanges
        .pipe(
            startWith(''),
            map(value => this.filterBook(value))
        );
        this.filteredQuiz = this.quizControl.valueChanges
        .pipe(
            startWith(''),
            map(value => this.filterQuiz(value))
        );
    }
    //#endregion

    protected getQuiz(): void {
      this.spinner.show();
      const warningMsg: string = 'The book: `' + this.selectedBook.name + '` do not have questions added.'
      this._apiRequest.requst('GET', this._pathRequest.quizPath + '/' + this.selectedBook.id).subscribe((responseData: Quiz[]) => {
        this.selectedBook.quiz = responseData;
        if (this.selectedBook.quiz.length === 0) {
          this.toastr.warning(warningMsg);
        } 
        this.spinner.hide();
      }, error => {
        this.selectedBook.quiz = [];
        this.toastr.warning(warningMsg);
        this.spinner.hide();
      });
    }
}