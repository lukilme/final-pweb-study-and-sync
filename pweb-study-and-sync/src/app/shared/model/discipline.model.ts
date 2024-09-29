import { Student } from "./student.model";

export class Discipline{
    id!: string;
    id_teacher : string;
    name: string;
    description: string;
    students: string[] = [];
    color: string;
    creation_date : Date;

    constructor(id_teacher: string, name: string, description: string, date: Date, color:string){
        this.id_teacher = id_teacher;
        this.name = name;
        this.description = description;
        this.color = color;
        this.creation_date = date;
    }
}