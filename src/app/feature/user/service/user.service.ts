import { Injectable } from "@angular/core";
import { Service } from "../../../core/interfaces/service.interface";
import { User } from "../../../shared/model/user.model";
import { UserValidator } from "./user.validator.service";
import { UserRegisterData } from "../../../core/interfaces/user.register.interface";

@Injectable()
export class UserService implements Service<User> {
  constructor() {}
  create(newUser: User): void {
    throw new Error("Method not implemented.");
  }

  register(userForm: UserRegisterData){

  }
}
