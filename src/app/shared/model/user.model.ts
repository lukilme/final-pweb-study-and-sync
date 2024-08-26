export abstract class User {
  
  id!: string;
  name: string;
  email: string;
  password: string;
  birthday: Date;
  status: string; // student or teacher
  disciplines: string[] = [];

  constructor(
    name: string,
    email: string,
    password: string,
    birthday: Date,
    status: string,
    disciplines: string[]
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.status = status;
    this.birthday = birthday;
    this.disciplines = disciplines;
  }
}
