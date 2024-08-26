import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DisciplineService } from '../../service/discipline.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageSweetAlertService } from '../../../../shared/service/message-sweet-alert.service';
import { UserStorageService } from '../../../../core/storage/user-storage.service';
import { DisciplineFormInterface } from '../../../../core/interfaces/discipline.form.interface';

@Component({
  selector: 'app-create-discipline-form',
  templateUrl: './create-discipline-form.component.html',
  styleUrls: ['./create-discipline-form.component.scss'] 
})
export class CreateDisciplineFormComponent {
  textareaMaxLength = 255;
  createFormDiscipline: FormGroup<{
    nameDisciplineField: FormControl<string | null>;
    descriptionDisciplineField: FormControl<string | null>;
  }>;

  constructor(
    private dialogRef: MatDialogRef<CreateDisciplineFormComponent>,
    private service: DisciplineService,
    private userStorage: UserStorageService
  ) {
    this.createFormDiscipline = new FormGroup({
      nameDisciplineField: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      descriptionDisciplineField: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(16),
      ]),
    });
  }

  createDiscipline() {
    if (this.createFormDiscipline.valid) {
      const newDiscipline: DisciplineFormInterface = {
        id_creator : this.userStorage.userSaved?.id,
        name: this.createFormDiscipline.get("nameDisciplineField")?.value,
        description : this.createFormDiscipline.get("descriptionDisciplineField")?.value
      }
      this.service.createDiscipline(newDiscipline).subscribe({
        next: () => {
          this.dialogRef.close();
          MessageSweetAlertService.sucesso("Created successfully");
        },
        error: () => {
          console.log("Error");
        }
      });
    } else {
      this.createFormDiscipline.markAllAsTouched();
    }
  }
}
