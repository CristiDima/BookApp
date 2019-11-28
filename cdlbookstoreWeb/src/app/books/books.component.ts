import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  protected types = new FormControl();
  protected typeList: string[] = ['Drama', 'Personal Development']

  constructor() { }

  ngOnInit() {
  }

}
