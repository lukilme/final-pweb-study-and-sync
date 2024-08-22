import { Component, inject, model, signal } from '@angular/core';
import { UserStorageService } from '../../../../core/storage/user-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateDisciplineFormComponent } from '../create-discipline-form/create-discipline-form.component';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.component.html',
  styleUrl: './home-teacher.component.scss'
})
export class HomeTeacherComponent {
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor(private storage : UserStorageService){

  }

  openCreationForm(){
    let sucess : boolean = false; 
    const dialogRef = this.dialog.open(CreateDisciplineFormComponent,{
      data: {name: this.name(), animal: this.animal()}
    });
   
    dialogRef.afterClosed().subscribe(result => {
      sucess = result;
    });
  }
}
