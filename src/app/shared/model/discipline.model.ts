export class Discipline{
    id!: string;
    id_teacher : string;
    name: string;
    description: string;

    constructor(id_teacher: string, name: string, description: string){
        this.id_teacher = id_teacher;
        this.name = name;
        this.description = description;
    }
}