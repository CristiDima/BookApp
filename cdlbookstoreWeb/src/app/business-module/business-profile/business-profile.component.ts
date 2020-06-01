import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../../shared/user-details.service';
import { BusinessService } from './business-service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent {

  public isPageLoaded = false;

  constructor(private businessService: BusinessService) {
  }
}
