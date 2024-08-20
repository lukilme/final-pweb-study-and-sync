import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './feature/user/components/user-form/user-form.component';

const routes: Routes = [  
  { path: '', component: UserFormComponent },
  { path: 'home',}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
