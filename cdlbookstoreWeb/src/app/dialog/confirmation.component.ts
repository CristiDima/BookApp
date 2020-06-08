import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component } from '@angular/core';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: 'confirmation.component.html',
    styleUrls: ['./confirmation.component.scss']
  })
  export class ConfirmationComponent {

    constructor(
      public dialogRef: MatDialogRef<ConfirmationComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      }

    public onNoClick(): void {
      this.dialogRef.close();
    }

}
