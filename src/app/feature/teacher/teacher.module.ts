import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTeacherComponent } from './components/home-teacher/home-teacher.component';
import { MaterialModule } from '../../core/material/material.module';
import { CreateDisciplineFormComponent } from './components/create-discipline-form/create-discipline-form.component';



@NgModule({
  declarations: [
    HomeTeacherComponent,
    CreateDisciplineFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    HomeTeacherComponent
  ]
})
export class TeacherModule { }
