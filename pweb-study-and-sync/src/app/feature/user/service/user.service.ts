import { Injectable } from "@angular/core";
import { User } from "../../../shared/model/user.model";
import { UserRegisterData } from "../../../core/interfaces/user.register.interface";
import { UserLoginData } from "../../../core/interfaces/user.login.interface";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of, switchMap, throwError } from "rxjs";
import { UserValidator } from "./user.validator";
import { UserStorageService } from "../../../core/storage/user-storage.service";
import { Teacher } from "../../../shared/model/teacher.model";
import { Student } from "../../../shared/model/student.model";
import { ServiceAbstract } from "../../../core/util/service.abstract";
import { FormException } from "../../../core/exception/form.exception";
import { UsuarioFirestoreService } from "../../../shared/services/usuario-firestore.service";
import { UsuarioRestService } from "./user-rest.service";

@Injectable({
  providedIn: 'root'
})

export class UserService extends ServiceAbstract<User> {
  override URL_TARGET = "http://localhost:8080/";

  constructor(httpClient: HttpClient, private storage: UserStorageService, private usuarioService: UsuarioFirestoreService) {
    super(httpClient);
  }

  register(userForm: UserRegisterData): Observable<User> {
    UserValidator.registerValidate(userForm);

    return this.readBy("email", userForm.emailRegisterField).pipe(
      catchError((err) => {
        console.error("Error on verify email:", err);
        return throwError(() => new Error("Error on verify email"));
      }),
      switchMap((users: User[]) => {
        if (users.length > 0) {
          return throwError(() => new Error("Email already registered"));
        } else {
          const newUser: Teacher | Student = this.buildUser(userForm);
          return this.create(newUser, this.URL_TARGET).pipe(
            catchError((err) => {
              console.error("Error occurred while creating user:", err);
              return throwError(
                () => new Error("Error occurred while creating user")
              );
            })
          );
        }
      })
    );
  }

  updateStorageUser(): Observable<User> {
    if (this.storage.userSaved) {
      return this.read(this.storage.userSaved.id).pipe(
        map((result: User) => {
          if (result.status == "teacher") {
            const userToSave = result as Teacher;
            this.storage.saveUser(userToSave);
          } else {
            const userToSave = result as Student;
            this.storage.saveUser(userToSave);
          }
          return result;
        }),
        catchError((error) => {
          console.error("Something wrong with saving user on storage:", error);
          return throwError(
            () => new Error("Something wrong with saving user on storage")
          );
        })
      );
    } else {
      console.error("Storage doesn't have a user stocked");
      return throwError(() => new Error("Storage doesn't have a user stocked"));
    }
  }

  /**
   * Logs in a user by validating the input and checking credentials.
   * @param loginData - The login data to validate and use for authentication.
   * @returns An observable indicating the login outcome.
   */
  login(loginData: UserLoginData) {
    UserValidator.loginValidate(loginData);

    return this.readBy("email", loginData.emailLoginField).pipe(
      catchError((err) => {
        console.error("Error occurred while fetching users:", err);
        return throwError(() => err);
      }),
      map((users) => {
        if (users.length > 0) {
          if (users[0].password === loginData.passwordLoginField) {
            if (users[0].status == "teacher") {
              const userToSave = users[0] as Teacher;
              this.storage.saveUser(userToSave);
            } else {
              const userToSave = users[0] as Student;
              this.storage.saveUser(userToSave);
            }
          } else {
            throw new FormException("WrongPassword", "PASSWORD");
          }
        } else {
          throw new FormException("UserNotFound", "EMAIL");
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

  updateUser(updated: UserRegisterData): Observable<User> {
    console.log(updated);
    return this.readBy("email", updated.emailRegisterField).pipe(
      catchError((err) => {
        console.error("Error on verify email:", err);
        return throwError(() => new Error("Error on verify email"));
      }),
      switchMap((users: User[]) => {
        if (users.length > 0) {
          const existingUser = users[0];
          
          if (existingUser.id !== this.storage.userSaved!.id) {
            return throwError(() => new Error("Email already in use"));
          }
        }
        const newUser: Teacher | Student = this.buildUser(updated);
        return this.update(newUser,this.storage.userSaved!.id).pipe(
          catchError((err) => {
            console.error("Error occurred while creating user:", err);
            return throwError(
              () => new Error("Error occurred while creating user")
            );
          })
        );
      })
    );
  }
}


