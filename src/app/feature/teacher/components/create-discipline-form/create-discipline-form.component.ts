import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-discipline-form',
  templateUrl: './create-discipline-form.component.html',
  styleUrl: './create-discipline-form.component.scss'
})
export class CreateDisciplineFormComponent {
data: any;
readonly dialogRef = inject(MatDialogRef<CreateDisciplineFormComponent>);
animal() {
throw new Error('Method not implemented.');
}
onNoClick(): void {
  this.dialogRef.close();
}

}
