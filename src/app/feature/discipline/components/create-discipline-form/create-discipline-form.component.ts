import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DisciplineService } from '../../service/discipline.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageSweetAlertService } from '../../../../shared/service/message-sweet-alert.service';


@Component({
  selector: 'app-create-discipline-form',
  templateUrl: './create-discipline-form.component.html',
  styleUrl: './create-discipline-form.component.scss'
})
export class CreateDisciplineFormComponent {
textareaMaxLength = 255; 
createFormDiscipline: FormGroup<{
  nameDisciplineField: FormControl<string | null>;
  descriptionDisciplineField: FormControl<string | null>;
}>

constructor(private dialogRef: MatDialogRef<CreateDisciplineFormComponent>, private service : DisciplineService) {
  this.createFormDiscipline = new FormGroup({
    nameDisciplineField: new FormControl<string>("", [
      Validators.required
    ]),
    descriptionDisciplineField: new FormControl<string>("", [
      Validators.required,
    ]),
  })

}


createDiscipline() {
  
  if (!this.createFormDiscipline.valid){
    this.service.createDiscipline().subscribe({
      next:()=>{
        this.dialogRef.close();
        MessageSweetAlertService.sucesso("Create successully")
      },
      error: ()=>{
        console.log("erro");
      }
    });
  }
}
}
