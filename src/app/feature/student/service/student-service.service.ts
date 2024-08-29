import { Injectable } from '@angular/core';
import { DisciplineService } from '../../discipline/service/discipline.service';
import { ServiceAbstract } from '../../../core/util/service.abstract';
import { Student } from '../../../shared/model/student.model';
import { HttpClient } from '@angular/common/http';
import { Discipline } from '../../../shared/model/discipline.model';
import { catchError, forkJoin, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService extends ServiceAbstract<Student>{
  override URL_TARGET: string = "http://localhost:3000/user";
  
  constructor(private disciplineService : DisciplineService,  httpClient: HttpClient,) {
    super(httpClient);
  }

  getStudentByDiscipline(id: string): Observable<Student[]> {
    return this.disciplineService.read(id).pipe(
      switchMap((discipline: Discipline) => {
        const studentObservables = discipline.students.map(studentId =>
          this.read(studentId)
        );
        return forkJoin(studentObservables);
      }),
      catchError((error) => {
        console.error('Erro ao buscar alunos:', error);
        return throwError(()=>{error}); 
      })
    );
  }
}
