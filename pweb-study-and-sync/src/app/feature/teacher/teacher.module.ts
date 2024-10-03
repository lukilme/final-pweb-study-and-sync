import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeTeacherComponent } from './components/home-teacher/home-teacher.component';
import { MaterialModule } from '../../core/material/material.module';
import { DisciplineModule } from '../discipline/discipline.module';

@NgModule({
  declarations: [
    HomeTeacherComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DisciplineModule
  ],
  exports:[
    HomeTeacherComponent
  ]
})
export class TeacherModule { }
