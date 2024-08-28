import { Component } from "@angular/core";
import { StudentServiceService } from "../../service/student-service.service";
import { UserStorageService } from "../../../../core/storage/user-storage.service";
import { Discipline } from "../../../../shared/model/discipline.model";
import { Student } from "../../../../shared/model/student.model";
import { UserService } from "../../../user/service/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageSweetAlertService } from "../../../../shared/service/message-sweet-alert.service";

@Component({
  selector: "app-list-student",
  templateUrl: "./list-student.component.html",
  styleUrl: "./list-student.component.scss",
})
export class ListStudentComponent {
  students: Student[] = [];
  discpline: Discipline | null = null;

  constructor(
    private service: StudentServiceService,
    private route: ActivatedRoute,
    private storage: UserStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      this.service.getStudentByDiscipline(id).subscribe({
        next: (students: Student[]) => {
          this.students = students;
        },
        error: (error) => {
          const errorMessage = error?.message || "Erro ao carregar alunos";
          MessageSweetAlertService.error(errorMessage);
        },
      });
    });
  }
}
