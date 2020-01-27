import { Component } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public isBookAction: boolean = false;
  public isAuthorAction: boolean = false;
  public isTypeAction: boolean = false;

  constructor() {}

  public onChangeBookAction() {
    this.isBookAction = true;
    this.isAuthorAction = false;
    this.isTypeAction = false;
  }

  public onChangeAuthorAction() {
    this.isBookAction = false;
    this.isAuthorAction = true;
    this.isTypeAction = false;
  }

  public onChangeTypeAction() {
    this.isBookAction = false;
    this.isAuthorAction = false;
    this.isTypeAction = true;
  }
}
