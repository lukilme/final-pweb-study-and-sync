import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DisciplineService } from '../../service/discipline.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageSweetAlertService } from '../../../../shared/service/message-sweet-alert.service';
import { UserStorageService } from '../../../../core/storage/user-storage.service';
import { DisciplineFormInterface, DisciplineFormInterfaceCreated } from '../../../../core/interfaces/discipline.form.interface';
import { Discipline } from '../../../../shared/model/discipline.model';
import { User } from '../../../../shared/model/user.model';

@Component({
  selector: 'app-create-discipline-form',
  templateUrl: './create-discipline-form.component.html',
  styleUrls: ['./create-discipline-form.component.scss'] 
})

export class CreateDisciplineFormComponent {

 
  textareaMaxLength = 255;
  editMode = false;
  createFormDiscipline: FormGroup;
  discipline: Discipline | null = null;



  constructor(
    private dialogRef: MatDialogRef<CreateDisciplineFormComponent>,
    private service: DisciplineService,
    private userStorage: UserStorageService,
    @Inject(MAT_DIALOG_DATA) public updatedDiscipline: any | null
  ) {
    this.createFormDiscipline = this.createForm();
    if (updatedDiscipline?.discipline) {
      this.populateForm(updatedDiscipline.discipline);
    }
  }

  private createForm(): FormGroup {
    return new FormGroup({
      nameDisciplineField: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      descriptionDisciplineField: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(16),
      ]),
      colorDisciplineField: new FormControl<string>("#555555")
    });
  }

  private populateForm(discipline: Discipline): void {
    this.editMode = true;
    this.discipline = discipline;
    this.createFormDiscipline.patchValue({
      nameDisciplineField: discipline.name,
      descriptionDisciplineField: discipline.description,
      colorDisciplineField: discipline.color || '#555555'
    });
  }

  private getDisciplineColor(): string {
    const textElement = document.getElementById("myColor") as HTMLInputElement | null;
    return textElement ? textElement.value : '#555555';
  }

  private getFormValues(): DisciplineFormInterfaceCreated | DisciplineFormInterface {
    return {
      id: this.discipline?.id,
      id_creator: this.userStorage.userSaved?.id,
      name: this.createFormDiscipline.get("nameDisciplineField")?.value!,
      description: this.createFormDiscipline.get("descriptionDisciplineField")?.value!,
      color: this.getDisciplineColor(),
      date_creation : this.discipline?.creation_date
    };
  }

  private handleSuccess(): void {
    this.dialogRef.close();
    MessageSweetAlertService.successWithReload(this.editMode ? "Updated successfully" : "Created successfully");
    
  }

  createOrUpdateDiscipline(): void {
    if (this.createFormDiscipline.invalid) {
      this.createFormDiscipline.markAllAsTouched();
      return;
    }
  
    const disciplineData = this.getFormValues();
    const serviceMethod = this.editMode 
      ? this.service.updateDiscipline(disciplineData) 
      : this.service.createDiscipline(disciplineData);
      
    serviceMethod.subscribe({
      next: (response: Object | null) => {
        this.handleSuccess();
      },
      error: (err: any) => {
        if(this.editMode){
          MessageSweetAlertService.error("Error when updating course");
        }else{
          MessageSweetAlertService.error("Error when creating discipline");
        }
      },
      complete: () => {
        console.log("feito");
      }
    });
  }
  
  
}
