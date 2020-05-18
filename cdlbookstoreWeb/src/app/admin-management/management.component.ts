import { Component } from '@angular/core';
import { ManagementService } from './management.service';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent {

  constructor(private managementService: ManagementService) {
  }
}
