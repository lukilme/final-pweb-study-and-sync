import { Injectable } from '@angular/core';
import { ServiceAbstract } from '../../../core/util/service.abstract';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DisciplineStorageService } from '../../../core/storage/discipline-storage.service';
import { Discipline } from '../../../shared/model/discipline.model';
import { UserService } from '../../user/service/user.service';
import { DisciplineFormInterface } from '../../../core/interfaces/discipline.form.interface';
import { Observable } from 'rxjs';
import { Student } from '../../../shared/model/student.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService extends ServiceAbstract<Discipline> {
  override URL_TARGET = "http://localhost:3000/discipline";

  constructor(
    httpClient: HttpClient,
    private storage: DisciplineStorageService,
    private userService: UserService
  ) {
    super(httpClient);
  }

  paginationDiscipline(limit : number, page: number){   
    return this.pagination(limit, page, '-creation_date');
  }

  createDiscipline(newDiscipline: DisciplineFormInterface): Observable<Discipline> {
    const discipline = new Discipline(
      newDiscipline.id_creator || '', 
      newDiscipline.name || '', 
      newDiscipline.description || '', 
      new Date()
    );
    return this.create(discipline);
  }

  deleteDiscipline(){

  }

  updateDiscipline(){

  }

  getAllDiscipline(){
    return this.readAll();
  }

  addStudentToDiscipline(email: string, id: string): void {
    this.userService.readBy("email", email).subscribe({
      next: (users: any) => {
        const student: Student = users.find((user: { email: string; }) => user.email === email);
  
        if (student) {
          this.read(id).subscribe({
            next: (discipline: Discipline) => {
              // Adiciona a disciplina ao estudante e vice-versa
              student.disciplines.push(discipline.id);
              discipline.students.push(student.id);
  
              // Atualiza o estudante no backend
              this.userService.update(student,student.id).subscribe({
                next: () => {
                  // Atualiza a disciplina no backend
                  this.update(discipline, discipline.id).subscribe({
                    next: () => {
                      console.log('Estudante adicionado à disciplina com sucesso!');
                    },
                    error: (err) => {
                      console.error('Erro ao atualizar a disciplina:', err);
                    }
                  });
                },
                error: (err) => {
                  console.error('Erro ao atualizar o estudante:', err);
                }
              });
            },
            error: (err) => {
              console.error('Erro ao ler a disciplina:', err);
            }
          });
        } else {
          console.error('Estudante não encontrado com o email fornecido.');
        }
      },
      error: (err) => {
        console.error('Erro ao ler o estudante:', err);
      }
    });
  }
  
  
}
