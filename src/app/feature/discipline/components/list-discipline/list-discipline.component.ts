import { Component, effect, Input, OnInit } from "@angular/core";
import { DisciplineService } from "../../service/discipline.service";
import { PageEvent } from "@angular/material/paginator";
import { Discipline } from "../../../../shared/model/discipline.model";
import { MessageSweetAlertService } from "../../../../shared/service/message-sweet-alert.service";
import Swal from "sweetalert2";
import { BehaviorSubject, catchError, of } from "rxjs";
import { UserStorageService } from "../../../../core/storage/user-storage.service";
import { UserService } from "../../../user/service/user.service";
import { User } from "../../../../shared/model/user.model";

@Component({
  selector: "app-list-discipline",
  templateUrl: "./list-discipline.component.html",
  styleUrls: ["./list-discipline.component.scss"],
})
export class ListDisciplineComponent implements OnInit {
  disciplines: Discipline[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  trackByDiscipline(index: number, discipline: Discipline): string {
    return discipline.id;
  }

  @Input()
  refreshListSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private disciplineService: DisciplineService,
    private storage: UserStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadDisciplines();
    this.refreshListSubject.subscribe((refresh) => {
      if (refresh) {
        this.loadDisciplines();
        this.refreshListSubject.next(false);
      }
    });
  }

  leaveDiscipline(id: string): void {
    const userId = this.storage.userSaved?.id;
    if (userId) {
      this.disciplineService.leaveDiscipline(userId, id).subscribe({
        next: () => {
          MessageSweetAlertService.success("Bye, bye, Discipline!");
          this.loadDisciplines();
        },
        error: (err: any) => {
          console.error("Error while leaving discipline:", err);
          MessageSweetAlertService.error("An error occurred while trying to leave the discipline. Please try again.");
        }
      });
    } else {
      console.warn("User is not logged in or user ID is missing.");
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadDisciplines();
  }

  addStudent(index: number): void {
    const discipline = this.disciplines[index];

    Swal.fire({
      title: "Send student email",
      input: "email",
      inputAttributes: {
        autocapitalize: "off",
        placeholder: "Enter student email",
      },
      showCancelButton: true,
      confirmButtonText: "Add student",
      showLoaderOnConfirm: true,
      preConfirm: (email: string) => {
        return this.disciplineService
          .addStudentToDiscipline(email, discipline.id).subscribe({
            next:(value : Discipline)=>{
              this.userService.updateStorageUser();
              MessageSweetAlertService.success(`Student added to discipline ${value.name}!`);
              this.loadDisciplines();
            },
            error:(err: any) => {
              Swal.showValidationMessage(`Error: ${err.message}`);
            }
          })
          
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed && !Swal.getValidationMessage()) {
        this.userService.updateStorageUser();
      }
    });
  }

  onDeleteDiscipline(index: number): void {
    const disciplineToDelete = this.disciplines[index];

    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete ${disciplineToDelete.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.disciplineService.deleteDiscipline(disciplineToDelete);
        this.loadDisciplines();
        MessageSweetAlertService.success("Bye bye discipline");
      }
    });
  }

  loadDiscplinesV2() {
    if (this.storage.userSaved) {
      this.disciplineService
        .loadDisciplines(this.storage.userSaved.disciplines)
        .subscribe({
          next: (result : Discipline[]) => {
            this.disciplines = result;
          },
          error:(err: any)=>{
            MessageSweetAlertService.error(err.message);
          }
        });
    }
  }

  loadDisciplines(): void {
    this.disciplineService
      .paginationDiscipline(this.pageSize, this.currentPage)
      .subscribe({
        next: (response: any) => {
          const dataResponse = response.data;
          console.log(response);

          this.userService.updateStorageUser().subscribe({
            next: (user: User) => {
              if (user?.disciplines?.length) {
                const disciplineMap = new Map(
                  dataResponse.map((discipline: { id: any }) => [
                    discipline.id,
                    discipline,
                  ])
                );

                this.disciplines = user.disciplines
                  .map((discipline_id) => disciplineMap.get(discipline_id))
                  .filter(
                    (discipline) => discipline !== undefined
                  ) as Discipline[];
              } else {
                this.disciplines = [];
              }

              console.log("Disciplines loaded:", this.disciplines);
              this.totalItems = this.disciplines.length;
            },
            error: (err) => {
              console.error("Error updating storage user:", err);
              MessageSweetAlertService.error(
                "Failed to update user information. Please try again."
              );
            },
          });
        },
        error: (err) => {
          console.error("Error loading disciplines:", err);
          MessageSweetAlertService.error(
            "Failed to load disciplines. Please try again."
          );
        },
      });
  }
}
