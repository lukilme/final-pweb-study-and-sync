import { Injectable } from "@angular/core";
import { Service } from "../../../core/interfaces/service.interface";
import { User } from "../../../shared/model/user.model";
import { UserRegisterData } from "../../../core/interfaces/user.register.interface";
import { UserLoginData } from "../../../core/interfaces/user.login.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserValidator } from "./user.validator.service";

@Injectable()
export class UserService implements Service<User> {
  private URL_USER = 'http://localhost:3000/user';

  constructor(private httpClient: HttpClient) {}


  read(key: string): Observable<User>{
    return this.httpClient.get<User>(`${this.URL_USER}/${key}`);
  }

  update(newObj: User): Observable<User> {
    return this.httpClient.put<User>(`${this.URL_USER}/${newObj.id}`, newObj);
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

  register(userForm: UserRegisterData){

    UserValidator.registerValidate(userForm);

    const newUser = new User(1,
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

  login(loginData : UserLoginData){

  }

}
