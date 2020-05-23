import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { Book } from 'src/app/models/book.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from "lodash";
import { Quiz, CorrectChoice } from '../../quiz.model';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { APIRequestService } from 'src/app/shared/api-request.service';

@Component({
    selector: 'app-create-quiz',
    templateUrl: './create-quiz.component.html',
    styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
    public bookControl: FormControl = new FormControl(null, Validators.required);
    public filteredBook: Observable<Book[]>;
    private selectedBook: Book;

    public correctChoice = CorrectChoice;
    public selected: any = null;

    protected addQuizForm: FormGroup = null;
    
    constructor(private bookService: BookService, public fb: FormBuilder, private _apiRequest: APIRequestService,
                private _pathRequest: PathRequestService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
        this.onResetForm();
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

    public get isSelectedCorrectAnswer(): boolean {
      return !_.isNil(this.selected);
    }

    //#region events
    protected onSubmit(): void {
        this.spinner.show();
        const successMsg: string = 'You added a  quiz for the book: `' + this.selectedBook.name + '`'
        const errorMsg: string = 'An error occured. The question was not saved. Please try again';
        const convMap = {};
        convMap['quiz'] = this.selectedBook.quiz;
        this._apiRequest.requst('POST', this._pathRequest.quizPath, convMap).subscribe((responseData: Quiz[]) => {
          this.selectedBook.quiz = responseData;
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

    public onAddQuestion(): void {
      const warningMsg: string = 'You added a question to the quiz for the book: `' + this.selectedBook.name + '`. To save the quiz please press save button.'
      const quiz: Quiz = this.createQuiz();
      if (_.isNil(this.selectedBook.quiz)) {
        this.selectedBook.quiz = [];
      }
      this.selectedBook.quiz.push(quiz);
      this.toastr.warning(warningMsg);
      this.addQuizForm.reset();
    }

    private onResetForm(): void {
      this.addQuizForm = this.fb.group({
        'booksName': this.bookControl,
        'question': new FormControl(null, [Validators.required]),
        'firstChoice': new FormControl(null, [Validators.required]),
        'secondChoice': new FormControl(null, [Validators.required]),
        'thirdChoice': new FormControl(null, [Validators.required]),
        'fourthChoice': new FormControl(null, [Validators.required]),
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

    private createQuiz(): Quiz {
      const quiz: Quiz = new Quiz;
      quiz.bookId = this.selectedBook.id;
      quiz.question = this.addQuizForm.value.question;
      quiz.firstChoice = this.addQuizForm.value.firstChoice;
      quiz.secondChoice = this.addQuizForm.value.secondChoice;
      quiz.thirdChoice = this.addQuizForm.value.thirdChoice;
      quiz.fourthChoice = this.addQuizForm.value.fourthChoice;
      quiz.correctChoice = this.selected.value;
      return quiz;
    }
}