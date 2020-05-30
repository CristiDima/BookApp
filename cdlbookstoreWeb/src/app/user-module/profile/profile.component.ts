import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/shared/user-details.service';
import { UserSessionService } from 'src/app/shared/user-session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public isPageLoaded = false;

  constructor(protected userDetailsService: UserDetailsService, protected userSessionService: UserSessionService) { }

  ngOnInit() {
  }

}
