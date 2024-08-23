import { User } from "./user.model";

export class Teacher extends User {

  qualification: string;
  

  constructor(
    name: string,
    email: string,
    password: string,
    birthday: Date,
    status: string,
    qualification: string,
    disciplines: string[]
  ) {
    super(name, email, password, birthday, status, disciplines);

    this.qualification = qualification;
  
  }
}
