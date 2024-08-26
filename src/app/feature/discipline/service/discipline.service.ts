import { Injectable } from '@angular/core';
import { ServiceAbstract } from '../../../core/util/service.abstract';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user/service/user.service';
import { DisciplineStorageService } from '../../../core/storage/discipline-storage.service';
import { DisciplineFormInterface } from '../../../core/interfaces/discipline.form.interface';
import { Discipline } from '../../../shared/model/discipline.model';
import { Student } from '../../../shared/model/student.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

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

  paginationDiscipline(limit: number, page: number): Observable<Object> {   
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

  getAllDiscipline(): Observable<Discipline[]> {
    return this.readAll();
  }

  
addStudentToDiscipline(email: string, id: string): Observable<Discipline | undefined> {
  return this.userService.readBy("email", email).pipe(
    map(users => users.find((user: { email: string }) => user.email === email) as Student),
    switchMap(student => 
      student ? this.read(id).pipe(
        switchMap(discipline => {
          student.disciplines.push(discipline.id);
          discipline.students.push(student.id);

          return this.userService.update(student, student.id).pipe(
            switchMap(() => this.update(discipline, discipline.id)),
            tap(() => console.log('Student successfully added to subject'))
          );
        })
      ) : throwError(() => new Error('Student not found with this email')) // Exceção quando o email não é encontrado
    ),
    catchError(err => {
      console.error("Error adding student:", err.message);
      return throwError(() => new Error("Unexpected error: " + err.message));
    })
  );
}
}
