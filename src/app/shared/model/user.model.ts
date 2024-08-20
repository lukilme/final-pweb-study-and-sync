export class User {
  private id : string | undefined;
  private _name: string;
  private _email: string;
  private _password: string;
  private _birthday: Date;
  private _status: string; // student or teacher

  constructor(
  
    name: string,
    email: string,
    password: string,
    birthday: Date,
    status: string
  ) {
   
    this._name = name;
    this._email = email;
    this._password = password;
    this._status = status;
    this._birthday = birthday;
  }

  public setId(newId: string){
    this.id = newId;
  }

  public getId():string{
    if(this.id === undefined){
      throw new Error("ID is undefined");
    }
    return this.id;
  }
  public get name(): string {
    return this._name;
  }

  public set name(newName: string) {
    if (!newName) {
      throw new Error("Invalid name.");
    }
    this._name = newName;
  }

  public get email(): string {
    return this._email;
  }

  public set email(newEmail: string) {
    if (!newEmail) {
      throw new Error("Invalid email.");
    }
    this._email = newEmail;
  }
  public get password(): string {
    return this._password;
  }

  public set password(newPassword: string) {
    if (!newPassword) {
      throw new Error("Invalid password.");
    }
    this._password = newPassword;
  }

  public get birthday(): Date {
    return this._birthday;
  }

  public set birthday(newBirthday: Date) {
    if (!newBirthday) {
      throw new Error("Invalid birthday.");
    }
    this._birthday = newBirthday;
  }

  public get status(): string {
    return this._status;
  }

  public set status(newStatus: string) {
    if (!newStatus) {
      throw new Error("Invalid status.");
    }
    this._status = newStatus;
  }
}
