import { Student } from "./student.model";

export class Discipline{
    id!: string;
    id_teacher : string;
    name: string;
    description: string;
    students: string[] = [];
    color: string;

    constructor(id_teacher: string, name: string, description: string, color:string){
        this.id_teacher = id_teacher;
        this.name = name;
        this.description = description;
        this.color = color;
    }
}