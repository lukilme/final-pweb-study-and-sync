import { User } from "./user.model";

export class Student extends User {
  course: string;
  semester: number;

  constructor(
    name: string,
    email: string,
    password: string,
    birthday: Date,
    status: string,
    course: string,
    disciplines: string[],
    semester: number
  ) {
    super(name, email, password, birthday, status, disciplines);
    this.course = course;
    this.semester = semester;
  }
}
