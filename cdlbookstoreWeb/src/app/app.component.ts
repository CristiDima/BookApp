import { Component, HostListener } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookStore';

  constructor(private authenticationService: AuthenticationService) {}

  @HostListener('window:mousemove') refreshUserState() {
    this.authenticationService.lastMouseMove = new Date();
  }
}
