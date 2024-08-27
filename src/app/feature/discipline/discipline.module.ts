import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDisciplineFormComponent } from './components/create-discipline-form/create-discipline-form.component';
import { ListDisciplineComponent } from './components/list-discipline/list-discipline.component';
import { MaterialModule } from '../../core/material/material.module';
import { DisciplineCardComponent } from './components/discipline-card/discipline-card.component';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { DisciplineHomeComponent } from './components/discipline-home/discipline-home.component';


@NgModule({
  declarations: [
    CreateDisciplineFormComponent,
    ListDisciplineComponent,
    DisciplineCardComponent,
    DisciplineHomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatCard, 
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatCardSubtitle

  ],
  exports:[
    ListDisciplineComponent
  ]
})
export class DisciplineModule { }
