import { Injectable } from "@angular/core";
import { ServiceAbstract } from "../../../core/util/service.abstract";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../../user/service/user.service";
import {
  DisciplineFormInterface,
  DisciplineFormInterfaceCreated,
} from "../../../core/interfaces/discipline.form.interface";
import { Discipline } from "../../../shared/model/discipline.model";
import { Student } from "../../../shared/model/student.model";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { UserStorageService } from "../../../core/storage/user-storage.service";
import { User } from "../../../shared/model/user.model";

@Injectable({
  providedIn: "root",
})
export class DisciplineService extends ServiceAbstract<Discipline> {
  override URL_TARGET = "http://localhost:3000/discipline";

  constructor(httpClient: HttpClient, private userService: UserService, private storage : UserStorageService) {
    super(httpClient);
  }

  paginationDiscipline(limit: number, page: number): Observable<Object> {
    return this.pagination(limit, page, "-creation_date");
  }


  leaveDiscipline(userId: string, disciplineId: string): void {
    this.userService.read(userId).pipe(
      switchMap(userUpdate =>
        this.read(disciplineId).pipe(
          map(disciplineUpdate => ({ userUpdate, disciplineUpdate }))
        )
      )
    ).subscribe({
      next: ({ userUpdate, disciplineUpdate }) => {
        userUpdate.disciplines = userUpdate.disciplines.filter(id => id !== disciplineId);
        disciplineUpdate.students = disciplineUpdate.students.filter(id => id !== userId);
  
        this.userService.update(userUpdate, userId).subscribe();
        this.update(disciplineUpdate, disciplineId).subscribe();
      },
      error: (err) => {
        console.error('Error while leaving discipline:', err);
      }
    });
  }

  createDiscipline(newDiscipline: Object): Observable<Object | null>  {
    return this.create(
      this.buildDiscipline(newDiscipline as DisciplineFormInterfaceCreated)
    ).pipe(
      switchMap((discipline: Discipline) => {
        if (this.storage.userSaved) {
          return this.userService.read(this.storage.userSaved.id).pipe(
            switchMap((user: User) => {
              user.disciplines.push(discipline.id);
              return this.userService.update(user, user.id);
            })
          );
        }
        return of(null);  
      }),
      catchError((error) => {
        console.error('Erro ao criar disciplina ou atualizar usuário:', error);
        return throwError(() => error); 
      })
    );
  }

  updateDiscipline(newDiscipline: Object): Observable<Object | null> {
    const discipline = this.buildDiscipline(
      newDiscipline as DisciplineFormInterface
    );
    if (discipline.id) {
      return this.update(discipline, discipline.id);
    }
    throw new Error("Discipline ID is required for update");
  }

  private buildDiscipline(
    newDiscipline: DisciplineFormInterfaceCreated | DisciplineFormInterface
  ): Discipline {
    const discipline = new Discipline(
      newDiscipline.id_creator || "",
      newDiscipline.name || "",
      newDiscipline.description || "",
      newDiscipline.date_creation || new Date(),
      newDiscipline.color || "#555555"
    );

    if ("id" in newDiscipline && newDiscipline.id) {
      discipline.id = newDiscipline.id;
    }

    return discipline;
  }

  getAllDiscipline(): Observable<Discipline[]> {
    return this.readAll();
  }

  deleteDiscipline(disciplineToDelete: Discipline): void {
    disciplineToDelete.students.forEach((student) => {
      this.userService.read(student).subscribe({
        next: (result: User) => {
          result.disciplines = result.disciplines.filter((disc) => disc !== disciplineToDelete.id);
          this.userService.update(result, result.id).subscribe({
            error: (err) => {
              console.error(`Error updating user ${result.id}:`, err);
            },
          });
        },
        error: (err) => {
          console.error(`Error reading user ${student}:`, err);
        }
      });
    });
  
    this.delete(disciplineToDelete.id).subscribe({
      error: (err) => {
        console.error(`Error deleting discipline ${disciplineToDelete.id}:`, err);
      }
    });
  }
  

  addStudentToDiscipline(
    email: string,
    id: string
  ): Observable<Discipline | undefined> {
    return this.userService.readBy("email", email).pipe(
      map(
        (users) =>
          users.find(
            (user: { email: string }) => user.email === email
          ) as Student
      ),
      switchMap(
        (student) =>
          student
            ? this.read(id).pipe(
                switchMap((discipline) => {
                  student.disciplines.push(discipline.id);
                  discipline.students.push(student.id);

                  return this.userService.update(student, student.id).pipe(
                    switchMap(() => this.update(discipline, discipline.id)),
                    tap(() =>
                      console.log("Student successfully added to subject")
                    )
                  );
                })
              )
            : throwError(() => new Error("Student not found with this email")) // Exceção quando o email não é encontrado
      ),
      catchError((err) => {
        console.error("Error adding student:", err.message);
        return throwError(() => new Error("Unexpected error: " + err.message));
      })
    );
  }
}
