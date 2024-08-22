import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { MaterialModule } from '../../core/material/material.module';



@NgModule({
  declarations: [
    HomeStudentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    HomeStudentComponent
  ]
})
export class StudentModule { }
