import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { UserRegisterData } from "../../../../core/interfaces/user.register.interface";

@Component({
  selector: "app-user-form-register",
  templateUrl: "./user-form-register.component.html",
  styleUrls: ["./user-form-register.component.scss"],
})

export class UserFormRegisterComponent {
  registerForm: FormGroup<{
    nameRegisterField: FormControl<string | null>;
    emailRegisterField: FormControl<string | null>;
    passwordRegisterField: FormControl<string | null>;
    repeat_passwordRegisterField: FormControl<string | null>;
    statusRegisterField: FormControl<string | null>;
    birthdayRegisterField: FormControl<string | null>;
  }>;
  hidePassword: boolean = true;

  constructor(private service: UserService) {
    this.registerForm = new FormGroup({
      nameRegisterField: new FormControl<string>("", [
        Validators.required
      ]),
      emailRegisterField: new FormControl<string>("", [
        Validators.required,
        Validators.email,
      ]),
      passwordRegisterField: new FormControl<string>("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      repeat_passwordRegisterField: new FormControl<string>("",[
        Validators.required,
     
      ]),
      statusRegisterField: new FormControl<string>("student",[
        Validators.required
      ]),
      birthdayRegisterField: new FormControl<string>("",[
        Validators.required,
        this.backtothefuture.bind(this)
      ])
    });
  }

  backtothefuture(control : FormControl) : { [error: string]: boolean } | null{
    if(this.registerForm){
      return  new Date(control.value)< new Date() ? null: { 'backToTheFuture': true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData: UserRegisterData = this.registerForm.value as UserRegisterData;
      try {
        this.service.register(formData);
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    } else {
      console.log("Form is invalid!", this.registerForm.errors);
    }
  }
}
