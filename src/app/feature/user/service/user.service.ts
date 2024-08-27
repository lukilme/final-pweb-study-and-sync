import { Injectable } from "@angular/core";
import { User } from "../../../shared/model/user.model";
import { UserRegisterData } from "../../../core/interfaces/user.register.interface";
import { UserLoginData } from "../../../core/interfaces/user.login.interface";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";
import { UserValidator } from "./user.validator.service";
import { Router } from "@angular/router";
import { UserStorageService } from "../../../core/storage/user-storage.service";
import { Teacher } from "../../../shared/model/teacher.model";
import { Student } from "../../../shared/model/student.model";
import { ServiceAbstract } from "../../../core/util/service.abstract";
import { FormException } from "../../../core/exception/form.exception";

@Injectable()
export class UserService extends ServiceAbstract<User> {
  override URL_TARGET = "http://localhost:3000/user";

  constructor(
    httpClient: HttpClient,
    private route: Router,
    private storage: UserStorageService
  ) {
    super(httpClient);
  }

  /**
   * Registers a new user by validating the input and creating the user.
   * @param userForm - The registration data to validate and use for creating a user.
   */
  register(userForm: UserRegisterData): Observable<User> {
    UserValidator.registerValidate(userForm);
  
    return this.readBy('email', userForm.emailRegisterField).pipe(
      catchError((err) => {
        console.error("Error on verify email:", err);
        return throwError(() => new Error("Error on verify email"));
      }),
      switchMap((users: User[]) => {
        if (users.length > 0) {
          return throwError(() => new Error("Email already registered"));
        } else {
          const newUser: Teacher | Student = this.buildUser(userForm);
          return this.create(newUser).pipe(
            catchError((err) => {
              console.error("Error occurred while creating user:", err);
              return throwError(() => new Error("Error occurred while creating user"));
            })
          );
        }
      })
    );
  }
  
  

  /**
   * Logs in a user by validating the input and checking credentials.
   * @param loginData - The login data to validate and use for authentication.
   * @returns An observable indicating the login outcome.
   */
  login(loginData: UserLoginData) {
    UserValidator.loginValidate(loginData);

    return this.readBy("email", loginData.emailLoginField).pipe(
      catchError(err => {
        console.error("Error occurred while fetching users:", err);
        return throwError(() => err); 
      }),
      map(users => {
        if (users.length > 0) {
          if (users[0].password === loginData.passwordLoginField) {
            this.storage.saveUser(users[0]);

          } else {
            throw new FormException("WrongPassword", 'PASSWORD');
          }
        } else {
          throw new FormException("UserNotFound", 'EMAIL');
        }
      })
    );
  }

  /**
   * Builds a user object (Teacher or Student) based on registration data.
   * @param data - The registration data used to build the user.
   * @returns A new Teacher or Student instance.
   */
  buildUser(data: UserRegisterData): Teacher | Student {
    if (data.statusRegisterField === "teacher") {
      return new Teacher(
        data.nameRegisterField,
        data.emailRegisterField,
        data.passwordRegisterField,
        new Date(data.birthdayRegisterField),
        data.statusRegisterField,
        data.qualificationRegisterField,
        [] 
      );
    } else {
      return new Student(
        data.nameRegisterField,
        data.emailRegisterField,
        data.passwordRegisterField,
        new Date(data.birthdayRegisterField),
        data.statusRegisterField,
        data.disciplineRegisterField,
        [],
        parseInt(data.semesterRegisterField, 10)
      );
    }
  }
}
