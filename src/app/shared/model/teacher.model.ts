import { User } from "./user.model";

export class Teacher extends User {
    private _discipline : string[] = [];
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
        return this._discipline;
      }
    
    addClassroom(classroom: string) {
        this._discipline.push(classroom);
    }
}