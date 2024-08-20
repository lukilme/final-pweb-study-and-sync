import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { UserRegisterData } from "../../../../core/interfaces/user.register.interface";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { MY_FORMATS } from "../../user.module";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, provideMomentDateAdapter } from "@angular/material-moment-adapter";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MessageSweetAlertService } from "../../../../shared/service/message-sweet-alert.service";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: "app-user-form-register",
  templateUrl: "./user-form-register.component.html",
  styleUrls: ["./user-form-register.component.scss"],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // Define o local de data para pt-BR
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } } // Opções adicionais do adaptador
  ]
  
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
        MessageSweetAlertService.sucesso("Registered successfully! 🎉✨")

      } catch (error: any) {
        MessageSweetAlertService.erro(error.message)
      }
    } else {
      console.log("Form is invalid!", this.registerForm.errors);
    }
  }
}
