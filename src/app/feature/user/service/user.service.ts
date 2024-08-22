import { Injectable } from "@angular/core";
import { Service } from "../../../core/interfaces/service.interface";
import { User } from "../../../shared/model/user.model";
import { UserRegisterData } from "../../../core/interfaces/user.register.interface";
import { UserLoginData } from "../../../core/interfaces/user.login.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserValidator } from "./user.validator.service";
import { Router } from "@angular/router";
import { UserStorageService } from "../../../core/storage/user-storage.service";

export interface UserJson {
  id: string;
  _name: string;
  _email: string;
  _password: string;
  _birthday: string; 
  _status: string; 
}

@Injectable()
export class UserService implements Service<User> {
  private URL_USER = 'http://localhost:3000/user';

  constructor(private httpClient: HttpClient, private route : Router, private storage : UserStorageService) {}


  read(key: string): Observable<User>{
    return this.httpClient.get<User>(`${this.URL_USER}/${key}`);
  }

  update(newObj: User): Observable<User> {
    return this.httpClient.put<User>(`${this.URL_USER}/${newObj.getId()}`, newObj);
  }

  delete(key: string): Observable<Object> {
    return this.httpClient.delete(`${this.URL_USER}/${key}`);
  }

  readAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.URL_USER);
  }

  create(newUser: User): Observable<User> {
    return this.httpClient.post<User>(this.URL_USER, newUser);
  }

  readBy(key: string,value: string ): Observable<UserJson[]>{
    return this.httpClient.get<UserJson[]>(`${this.URL_USER}?${key}=${value}`);
  }


  register(userForm: UserRegisterData){

    UserValidator.registerValidate(userForm);

    const newUser = new User(
      userForm.nameRegisterField,
      userForm.emailRegisterField,
      userForm.passwordRegisterField,
      new Date(userForm.birthdayRegisterField),
      userForm.statusRegisterField
    );
    
    this.create(newUser).subscribe({
      next: value => {
        console.log('Observable emitted the next value: ' + value);
        return value;
      },
      error: err => {
        console.error('Observable emitted an error: ' + err);
        return null;
      }
    });
  }

  login(loginData: UserLoginData) {
    UserValidator.loginValidate(loginData);
    this.readBy("email", loginData.emailLoginField).subscribe({
      next: users => {
        if (users.length > 0) {
          const user = new User(
             users[0]._name,
             users[0]._email,
             users[0]._password,
             new Date(users[0]._birthday),
            users[0]._status
          );
          user.setId(users[0].id);
          if (user.password === loginData.passwordLoginField) {
            this.storage.saveUser(user);
            this.route.navigate(['home']);
          } else {
            console.error("Wrong password!");
          }
        } else {
          console.error("User not found!");
        }
      },
      error: err => {
        console.error('Observable emitted an error: ' + err);
      }
    });
  }

}
