import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../shared/user-details.service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public isPageLoaded: boolean = false;

  constructor(private userDetailsService: UserDetailsService) { }

  ngOnInit(){

  }

}
