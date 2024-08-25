import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { UserLoginData } from "../../../../core/interfaces/user.login.interface";
import { MessageSweetAlertService } from "../../../../shared/service/message-sweet-alert.service";
import { FormException } from "../../../../core/exception/form.exception";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-form-login",
  templateUrl: "./user-form-login.component.html",
  styleUrl: "./user-form-login.component.scss",
})
export class UserFormLoginComponent {
  loginForm: FormGroup<{
    emailLoginField: FormControl<string | null>;
    passwordLoginField: FormControl<string | null>;
  }>;
  hide: boolean = true;

  constructor(private service: UserService, private route : Router) {
    this.loginForm = new FormGroup({
      emailLoginField: new FormControl<string | null>("", [
        Validators.required,
        Validators.email,
      ]),
      passwordLoginField: new FormControl<string | null>("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData: UserLoginData = this.loginForm.value as UserLoginData;
      this.service.login(formData).subscribe({
        next: () => {
          
          this.route.navigate(["home"]);
        },
        error: (error: any) => {
          if (error instanceof FormException) {
            switch (error.statusCode) {
              case 'PASSWORD':
                const formControlErrorPassword = this.loginForm.get('passwordLoginField');
                if (formControlErrorPassword) {
                  formControlErrorPassword.setErrors({ [error.message]:true });
                }
                break;
              case 'EMAIL':
                const formControlErrorEmail = this.loginForm.get('emailLoginField');
                if (formControlErrorEmail) {
                  formControlErrorEmail.setErrors({ [error.message]: true });
                }
                break;
              default:
                MessageSweetAlertService.erro("Unexpected error happened");
                console.error(error);
            }
          } else {
            MessageSweetAlertService.erro("Unexpected error happened");
            console.error(error);
          }
        }
      });
    } else {
      MessageSweetAlertService.erro("Form fields were not filled out correctly");
    }
  }
}
