import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { UserLoginData } from "../../../../core/interfaces/user.login.interface";
import { MessageSweetAlertService } from "../../../../shared/service/message-sweet-alert.service";
import { FormException } from "../../../../core/exception/form.exception";
import { Router } from "@angular/router";
import { UserRESTService } from "../../service/userREST.service";
import { UserStorageService } from "../../../../core/storage/user-storage.service";

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

  constructor(private service: UserRESTService, private route : Router, private storage :UserStorageService) {
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
            console.log(response);
            this.storage.saveUser(response);
            this.route.navigate(["home"]);
            // Remover a linha de recarregar a página se desnecessária
            location.reload();
          }
        },
        error: (error: any) => {
          switch (error.status){
            case 401:
              MessageSweetAlertService.error("Password don't maches with email");
              break
            case 404:
              MessageSweetAlertService.error("Email not found!");
              break;
            case 500:
              MessageSweetAlertService.error("Server error");
              break;
            default:
              MessageSweetAlertService.error("Something wrong happens");
          }
        }
      });
    } else {
      MessageSweetAlertService.error("Form fields were not filled out correctly");
    }
  }
  
}
