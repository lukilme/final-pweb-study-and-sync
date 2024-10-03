import { Component, TrackByFunction } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { UsuarioRestService } from "../../service/user-rest.service";
import { UserRegisterData } from "../../../../core/interfaces/user.register.interface";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS,  } from "@angular/material-moment-adapter";
import { MessageSweetAlertService } from "../../../../shared/service/message-sweet-alert.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../../../shared/model/user.model";
import { Subject, takeUntil } from "rxjs";
import { Teacher } from "../../../../shared/model/teacher.model";
import { Student } from "../../../../shared/model/student.model";
import { UserRESTService } from "../../service/userREST.service";

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
  flag_disability = false;
  focus_user : User | null = null;
  private unsubscribe$ = new Subject<void>();


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
  
  constructor(private service: UserRESTService, private route : ActivatedRoute, private router: Router) {
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

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      const id = params['id'];
      if (id) {
        this.service.read(id).subscribe({
          next: (value: User) => {
            this.focus_user = value;
            console.log(this.focus_user);
            this.populateForm(this.focus_user);
            this.option_flag = value.status;
          },
          error: (err) => {
            console.error(err)
            MessageSweetAlertService.error("User not found");
            this.router.navigate([""]);
            
          }
        });
      }
    });
  }

  populateForm(user: User) {
    this.registerForm.patchValue({
    nameRegisterField: user.name,
    emailRegisterField: user.email,
    statusRegisterField: user.status,
    passwordRegisterField : user.password,
    birthdayRegisterField: user.birthday.toString(),
    });
    const textElement = document.getElementById("status-select") as HTMLInputElement | null;
    if(textElement){
      textElement.value = user.status;
      this.flag_disability = true;
    }
    if(user.status=='teacher'){
      const teacherAux = user as Teacher;
      this.registerForm.patchValue({
        qualificationRegisterField : teacherAux.qualification,
        disciplineRegisterField : 'Internet systems'
      })
      this.onOptionSelected();
      this.registerForm.get('semesterRegisterField')?.setValue("1");
    }else{
      const studentAux = user as Student;
      this.registerForm.patchValue({
          semesterRegisterField : studentAux.semester.toString(),
         disciplineRegisterField : studentAux.course,
         qualificationRegisterField: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX'
      })
    }
    
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
      const actions = (this.focus_user == null) 
      ? (data: UserRegisterData) => this.service.register(data) 
      : (data: UserRegisterData) => this.service.updateUser(data);
      actions(formData).subscribe({
        next: () => {
          const message : string =  (this.focus_user == null)? "Registered successfully! 🎉✨" : "Updated successfully! 🎉✨";
          MessageSweetAlertService.success(message);
        },
        error: (error : any) => {
          MessageSweetAlertService.error(error.message);
        }
      });
    } else {
      console.log("Form is invalid!", this.registerForm.errors);
      MessageSweetAlertService.error("Form is invalid!");
    }
  } 

  trackOption(index: number, option: any): any {
    return option; 
  }

  onOptionSelected() {
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
        this.registerForm.get('qualificationRegisterField')?.reset();
      }
    } else {
      MessageSweetAlertService.error("Something wrong with category... sorry");
    }
  }
}
