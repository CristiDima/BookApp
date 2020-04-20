import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../shared/user-details.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public isOnDetailsPage: boolean = false;
  public isOnPaymentPage: boolean = false;
  public isOnLoannedBooksPage: boolean = false;
  public isOnOnlineBooksPage: boolean = false;
  public isOnReadListPage: boolean = false;

  constructor(private userDetailsService: UserDetailsService) { }

  ngOnInit(){

  }

  //region Events
  public onDetailsPage() {
    this.isOnDetailsPage = true;
    this.isOnPaymentPage = false;
    this.isOnLoannedBooksPage = false;
    this.isOnOnlineBooksPage = false;
    this.isOnReadListPage = false;
  }

  public onPaymentPage() {
    this.isOnDetailsPage = false;
    this.isOnPaymentPage = true;
    this.isOnLoannedBooksPage = false;
    this.isOnOnlineBooksPage = false;
    this.isOnReadListPage = false;
  }

  public onLoannedBooksPage() {
    this.isOnDetailsPage = false;
    this.isOnPaymentPage = false;
    this.isOnLoannedBooksPage = true;
    this.isOnOnlineBooksPage = false;
    this.isOnReadListPage = false;
  }

  public onOnlineBooksPage() {
    this.isOnDetailsPage = false;
    this.isOnPaymentPage = false;
    this.isOnLoannedBooksPage = false;
    this.isOnOnlineBooksPage = true;
    this.isOnReadListPage = false;
  }

  public onReadListPage() {
    this.isOnDetailsPage = false;
    this.isOnPaymentPage = false;
    this.isOnLoannedBooksPage = false;
    this.isOnOnlineBooksPage = false;
    this.isOnReadListPage = true;
  }
  //endregion

}
