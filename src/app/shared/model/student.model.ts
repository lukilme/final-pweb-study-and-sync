import { User } from "./user.model";

export class Student extends User {
  private _classrooms: string[] = [];
  constructor(
    name: string,
    email: string,
    password: string,
    birthday: Date,
    status: string
  ) {
    super(name, email, password, birthday, status);
  }

  get classroom(): string[] {
    return this._classrooms;
  }

  addClassroom(classroom: string) {
    this._classrooms.push(classroom);
  }
}
