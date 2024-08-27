import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './feature/user/components/user-form/user-form.component';
import { HomeComponent } from './feature/user/components/home/home.component';
import { PerfilComponent } from './feature/user/components/perfil/perfil.component';
import { DisciplineHomeComponent } from './feature/discipline/components/discipline-home/discipline-home.component';
import { HomeStudentComponent } from './feature/student/components/home-student/home-student.component';
import { ListDisciplineComponent } from './feature/discipline/components/list-discipline/list-discipline.component';
import { ListStudentComponent } from './feature/student/components/list-student/list-student.component';


const routes: Routes = [  
  { path: '', component: UserFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user/:id', component: PerfilComponent },
  { path: 'discipline/:id', component: ListStudentComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
