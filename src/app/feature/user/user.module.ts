import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormRegisterComponent } from './components/user-form-register/user-form-register.component';
import { UserFormLoginComponent } from './components/user-form-login/user-form-login.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MaterialModule } from '../../core/material/material.module';
import { UserService } from './service/user.service';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {MatMomentDateModule, provideMomentDateAdapter} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentModule } from '../student/student.module';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';





export const MY_FORMATS = {
  parse: {
    dateInput:
 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMM YYYY',
  },
}


@NgModule({
  declarations: [
    UserFormRegisterComponent,
    UserFormLoginComponent,
    UserFormComponent,
    HomeComponent,
    PerfilComponent
  ],
  providers:[
    UserService,
    HttpClient,
    provideMomentDateAdapter(MY_FORMATS),
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    TeacherModule,
    StudentModule
    
  ],
  exports:[
    UserFormComponent,
    HomeComponent,
  ]
})
export class UserModule {}

