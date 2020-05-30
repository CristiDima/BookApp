import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { Book } from 'src/app/models/book.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { PathRequestService } from 'src/app/shared/path-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { APIRequestService } from 'src/app/shared/api-request.service';
import { CorrectChoice, Quiz } from 'src/app/models/quiz.model';
import { APIMessagesService } from 'src/app/shared/api-messages.service';

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
    constructor(private bookService: BookService, public fb: FormBuilder, private apiRequest: APIRequestService,
                private pathRequest: PathRequestService, private spinner: NgxSpinnerService, private apiMessage: APIMessagesService) {
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
        const convMap = {};
        // tslint:disable-next-line: no-string-literal
        convMap['quiz'] = this.selectedBook.quiz;
        this.apiRequest.requst('POST', this.pathRequest.quizPath, convMap).subscribe((responseData: Quiz[]) => {
          this.selectedBook.quiz = responseData;
          this.spinner.hide();
          this.apiMessage.onCreateQuizMessages(this.selectedBook);
        }, error => {
          this.spinner.hide();
          this.apiMessage.onCreateQuizMessages(error, true);
        });
    }

    protected onCancel(): void {
        this.addQuizForm.reset();
    }

    public onAddQuestion(): void {
      const quiz: Quiz = this.createQuiz();
      if (_.isNil(this.selectedBook.quiz)) {
        this.selectedBook.quiz = [];
      }
      this.selectedBook.quiz.push(quiz);
      this.apiMessage.onAddQuestion(this.selectedBook);
      this.addQuizForm.reset();
    }

    private onResetForm(): void {
      this.addQuizForm = this.fb.group({
        booksName: this.bookControl,
        question: new FormControl(null, [Validators.required]),
        firstChoice: new FormControl(null, [Validators.required]),
        secondChoice: new FormControl(null, [Validators.required]),
        thirdChoice: new FormControl(null, [Validators.required]),
        fourthChoice: new FormControl(null, [Validators.required]),
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
      const quiz: Quiz = new Quiz();
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
