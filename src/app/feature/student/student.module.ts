import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { MaterialModule } from '../../core/material/material.module';
import { InviteDisciplineFormComponent } from './components/invite-discipline-form/invite-discipline-form.component';
import { DisciplineModule } from '../discipline/discipline.module';



@NgModule({
  declarations: [
    HomeStudentComponent,
    InviteDisciplineFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DisciplineModule
  ],
  exports:[
    HomeStudentComponent
  ]
})
export class StudentModule { }
