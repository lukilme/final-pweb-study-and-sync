import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormRegisterComponent } from './components/user-form-register/user-form-register.component';
import { UserFormLoginComponent } from './components/user-form-login/user-form-login.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MaterialModule } from '../../core/material/material.module';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    UserFormRegisterComponent,
    UserFormLoginComponent,
    UserFormComponent
  ],
  providers:[
    UserService
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    UserFormComponent
  ]
})
export class UserModule {}
