import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { UserLoginData } from "../../../../core/interfaces/user.login.interface";
import { MessageSweetAlertService } from "../../../../shared/service/message-sweet-alert.service";
import { FormException } from "../../../../core/exception/form.exception";
import { Router } from "@angular/router";
import { UserRESTService } from "../../service/userREST.service";

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

  constructor(private service: UserRESTService, private route : Router) {
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
        next: (response: any) => {
          if (response) {
            this.route.navigate(["home"]);
            // Remover a linha de recarregar a página se desnecessária
            // location.reload();
          }
        },
        error: (error: any) => {
          // Verifique o status da resposta de erro para determinar o tipo de erro
          if (error.status === 401) { // Unauthorized
            MessageSweetAlertService.error("Invalid email or password");
          } else {
            // Se você estiver recebendo um erro de validação detalhado do backend
            if (error.error && error.error.details) {
              error.error.details.forEach((detail: any) => {
                switch (detail.field) {
                  case 'password':
                    const formControlErrorPassword = this.loginForm.get('passwordLoginField');
                    if (formControlErrorPassword) {
                      formControlErrorPassword.setErrors({ [detail.message]: true });
                    }
                    break;
                  case 'email':
                    const formControlErrorEmail = this.loginForm.get('emailLoginField');
                    if (formControlErrorEmail) {
                      formControlErrorEmail.setErrors({ [detail.message]: true });
                    }
                    break;
                  default:
                    MessageSweetAlertService.error("Unexpected error happened");
                    console.error(detail);
                }
              });
            } else {
              MessageSweetAlertService.error("Unexpected error happened");
              console.error(error);
            }
          }
        }
      });
    } else {
      MessageSweetAlertService.error("Form fields were not filled out correctly");
    }
  }
  
}
