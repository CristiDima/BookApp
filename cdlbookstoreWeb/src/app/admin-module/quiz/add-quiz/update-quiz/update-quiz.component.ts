import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { Book } from 'src/app/models/book.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { Quiz, CorrectChoice } from 'src/app/models/quiz.model';

@Component({
    selector: 'app-update-quiz',
    templateUrl: './update-quiz.component.html',
    styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {

    public bookControl: FormControl = new FormControl(null, Validators.required);
    public filteredBook: Observable<Book[]>;
    private selectedBook: Book;

    public quizControl: FormControl = new FormControl(null, Validators.required);
    public filteredQuiz: Observable<Quiz[]>;
    private selectedQuiz: Quiz;

    public correctChoice = CorrectChoice;
    public selected: any = null;

    protected addQuizForm: FormGroup = null;

    constructor(private bookService: BookService, public fb: FormBuilder, private apiRequest: APIRequestService,
                private pathRequest: PathRequestService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
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

    public get isSelectedCorrectAnswer(): boolean {
      return !_.isNil(this.selected);
    }

    //#region events
    protected onSubmit(): void {
        this.spinner.show();
        const successMsg: string = 'You updated a question for the book: `' + this.selectedBook.name + '`';
        const errorMsg = 'An error occured. The question was not saved. Please try again';
        this.updateQuiz();
        this.apiRequest.requst('PUT', this.pathRequest.quizPath + '/' + this.selectedQuiz.id, this.selectedQuiz)
        .subscribe((responseData: Quiz) => {
          this.selectedQuiz = responseData;
          this.spinner.hide();
          this.toastr.success(successMsg);
        }, error => {
          this.spinner.hide();
          this.toastr.error(errorMsg);
        });
    }

    protected onCancel(): void {
        this.addQuizForm.reset();
    }

    private onResetForm(): void {
      if (_.isNil(this.selectedQuiz)) {
          return;
      }
      this.addQuizForm = this.fb.group({
        booksName: this.bookControl,
        question: new FormControl(this.selectedQuiz.question, [Validators.required]),
        firstChoice: new FormControl(this.selectedQuiz.firstChoice, [Validators.required]),
        secondChoice: new FormControl(this.selectedQuiz.secondChoice, [Validators.required]),
        thirdChoice: new FormControl(this.selectedQuiz.thirdChoice, [Validators.required]),
        fourthChoice: new FormControl(this.selectedQuiz.fourthChoice, [Validators.required]),
      });
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
          this.selected = this.setCorrectChoice();
          this.onResetForm();
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

    private updateQuiz(): void {
      this.selectedQuiz.bookId = this.selectedBook.id;
      this.selectedQuiz.question = this.addQuizForm.value.question;
      this.selectedQuiz.firstChoice = this.addQuizForm.value.firstChoice;
      this.selectedQuiz.secondChoice = this.addQuizForm.value.secondChoice;
      this.selectedQuiz.thirdChoice = this.addQuizForm.value.thirdChoice;
      this.selectedQuiz.fourthChoice = this.addQuizForm.value.fourthChoice;
      this.selectedQuiz.correctChoice = this.selected.value;
    }

    protected getQuiz(): void {
      this.spinner.show();
      const warningMsg: string = 'The book: `' + this.selectedBook.name + '` do not have questions added.';
      this.apiRequest.requst('GET', this.pathRequest.quizPath + '/' + this.selectedBook.id).subscribe((responseData: Quiz[]) => {
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

    private setCorrectChoice(): void {
      if (this.selectedQuiz.correctChoice === CorrectChoice.firstChoice) {
        this.selected = CorrectChoice.firstChoice;
      } else if (this.selectedQuiz.correctChoice === CorrectChoice.secondChoice) {
        this.selected = CorrectChoice.secondChoice;
      } else if (this.selectedQuiz.correctChoice === CorrectChoice.thirdChoice) {
        this.selected = CorrectChoice.thirdChoice;
      } else if (this.selectedQuiz.correctChoice === CorrectChoice.fourthChoice) {
        this.selected = CorrectChoice.fourthChoice;
      }
    }
}
