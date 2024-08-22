import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeTeacherComponent } from './components/home-teacher/home-teacher.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeTeacherComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TeacherModule { }
