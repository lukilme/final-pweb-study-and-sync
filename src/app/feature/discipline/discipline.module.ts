import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDisciplineFormComponent } from './components/create-discipline-form/create-discipline-form.component';
import { ListDisciplineComponent } from './components/list-discipline/list-discipline.component';
import { MaterialModule } from '../../core/material/material.module';
import { DisciplineCardComponent } from './components/discipline-card/discipline-card.component';



@NgModule({
  declarations: [
    CreateDisciplineFormComponent,
    ListDisciplineComponent,
    DisciplineCardComponent
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
