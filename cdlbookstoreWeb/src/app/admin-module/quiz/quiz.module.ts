import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { CreateQuizComponent } from './add-quiz/create-quiz/create-quiz.component';
import { UpdateQuizComponent } from './add-quiz/update-quiz/update-quiz.component';
import { DeleteQuizComponent } from './add-quiz/delete-quiz/delete-quiz.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
    declarations: [
        AddQuizComponent,
        CreateQuizComponent,
        UpdateQuizComponent,
        DeleteQuizComponent
    ],
    imports: [MaterialModule, BrowserModule],
    providers: [],
    bootstrap: [],
    exports: []
  })
  export class QuizModule { }
