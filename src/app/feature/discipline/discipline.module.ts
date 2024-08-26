import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDisciplineFormComponent } from './components/create-discipline-form/create-discipline-form.component';
import { ListDisciplineComponent } from './components/list-discipline/list-discipline.component';
import { MaterialModule } from '../../core/material/material.module';



@NgModule({
  declarations: [
    CreateDisciplineFormComponent,
    ListDisciplineComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[
    ListDisciplineComponent
  ]
})
export class DisciplineModule { }
