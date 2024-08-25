import { Component, TrackByFunction } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { UserRegisterData } from "../../../../core/interfaces/user.register.interface";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS,  } from "@angular/material-moment-adapter";
import { MessageSweetAlertService } from "../../../../shared/service/message-sweet-alert.service";
import { MatSelectChange } from "@angular/material/select";

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

interface Course{
  value: string;
  viewValue: string;
  semesters: number;
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
  semester_number : string[]= [];
  semester_input_flag: boolean = true; 
  option_flag = "teacher";
  courses: Course[] = [
    {value: 'Internet systems', viewValue: 'Internet systems', semesters:6},
    {value: 'Computer networks', viewValue: 'Computer Networks', semesters:6},
    {value: 'Electrical engineering', viewValue: 'Electrical engineering', semesters:10},
    {value: 'Administration', viewValue: 'Administration', semesters:8},
    {value: 'Marketing', viewValue: 'Marketing', semesters:8},
    {value: 'Mechanical engineering', viewValue: 'Mechanical engineering', semesters:10},
  ];

  registerForm: FormGroup<{
    nameRegisterField: FormControl<string | null>;
    emailRegisterField: FormControl<string | null>;
    passwordRegisterField: FormControl<string | null>;
    repeat_passwordRegisterField: FormControl<string | null>;
    statusRegisterField: FormControl<string | null>;
    birthdayRegisterField: FormControl<string | null>;
    disciplineRegisterField: FormControl<string | null>;
    qualificationRegisterField: FormControl<string | null>;
    semesterRegisterField: FormControl<string | null>;
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
        Validators.minLength(8),
      ]),
      repeat_passwordRegisterField: new FormControl<string>("",[
        Validators.required,
        Validators.minLength(8)
      ]),
      statusRegisterField: new FormControl<string>("teacher",[
        Validators.required
      ]),
      birthdayRegisterField: new FormControl<string>("",[
        Validators.required,
        this.backtothefuture.bind(this)
      ]),
      disciplineRegisterField: new FormControl<string>("",[
        Validators.required]),
      
      qualificationRegisterField: new FormControl<string>("",[
        Validators.required]),
        
      semesterRegisterField: new FormControl<string>("0",[
        Validators.required]),
    });
    this.onOptionStatusSelected();
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
  trackOption(index: number, option: any): any {
    return option; 
  }

  onOptionSelected() {
    console.log("okasd")
    const selectedCourse = this.courses.find((course) => course.value === this.registerForm.get("disciplineRegisterField")?.value)
    if (selectedCourse) {
      this.semester_number = [];
      for (let index = 1; index <= selectedCourse.semesters; index++) { 
        this.semester_number.push(`${index}`);
      }
      this.registerForm.get('semesterRegisterField')?.enable();
    } else {
      this.semester_number = []; 
      this.registerForm.get('semesterRegisterField')?.disable();
    }
  }

  onOptionStatusSelected() {
    const result = this.registerForm.get('statusRegisterField')?.value;
    if (result != null) {
      this.option_flag = result;
      if (this.option_flag === 'student') {
        this.registerForm.get('qualificationRegisterField')?.setValue("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        this.registerForm.get('disciplineRegisterField')?.reset();
        this.registerForm.get('semesterRegisterField')?.reset();
        this.registerForm.get('semesterRegisterField')?.disable();
      } else {
        this.registerForm.get('disciplineRegisterField')?.setValue("Internet systems");
        this.onOptionSelected();
        this.registerForm.get('semesterRegisterField')?.setValue("1");
        console.log(this.registerForm.get('disciplineRegisterField')?.value);
        this.registerForm.get('qualificationRegisterField')?.reset();
      }
    } else {
      MessageSweetAlertService.erro("Something wrong with category... sorry");
    }
  }
}
