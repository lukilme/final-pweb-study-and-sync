import { Injectable } from "@angular/core";
import { User } from "../../../shared/model/user.model";
import { UserRegisterData } from "../../../core/interfaces/user.register.interface";
import { UserLoginData } from "../../../core/interfaces/user.login.interface";
import { HttpClient } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";
import { UserValidator } from "./user.validator.service";
import { Router } from "@angular/router";
import { UserStorageService } from "../../../core/storage/user-storage.service";
import { Teacher } from "../../../shared/model/teacher.model";
import { Student } from "../../../shared/model/student.model";
import { ServiceAbstract } from "../../../core/util/service.abstract";
import { FormException } from "../../../core/exception/form.exception";

@Injectable()
export class UserService extends ServiceAbstract<User> {
  // Define the target URL for HTTP requests
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
  register(userForm: UserRegisterData) {
    // Validate registration data
    UserValidator.registerValidate(userForm);

    // Build user object based on registration data
    const newUser: Teacher | Student = this.buildUser(userForm);

    // Create the user and handle the observable response
    this.create(newUser).subscribe({
      next: (value) => {
        console.log("User successfully created:", value);
        // Additional success logic can be added here if needed
      },
      error: (err) => {
        console.error("Error occurred while creating user:", err);
        // Handle error scenario
      },
    });
  }

  /**
   * Logs in a user by validating the input and checking credentials.
   * @param loginData - The login data to validate and use for authentication.
   * @returns An observable indicating the login outcome.
   */
  login(loginData: UserLoginData) {
    // Validate login data
    UserValidator.loginValidate(loginData);

    // Read user by email and handle the response
    return this.readBy("email", loginData.emailLoginField).pipe(
      catchError(err => {
        console.error("Error occurred while fetching users:", err);
        return throwError(() => err); // Re-throw the error for further handling
      }),
      map(users => {
        if (users.length > 0) {
          // Check if the password matches
          if (users[0].password === loginData.passwordLoginField) {
            // Navigate to home page on successful login
            this.route.navigate(["home"]);
          } else {
            // Throw an exception if the password is incorrect
            throw new FormException("WrongPassword", 'PASSWORD');
          }
        } else {
          // Throw an exception if the user is not found
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
