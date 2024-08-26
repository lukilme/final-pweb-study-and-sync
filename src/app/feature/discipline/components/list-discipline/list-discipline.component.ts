import { Component, effect, Input, OnInit } from '@angular/core';
import { DisciplineService } from '../../service/discipline.service';
import { PageEvent } from '@angular/material/paginator';
import { Discipline } from '../../../../shared/model/discipline.model';
import { MessageSweetAlertService } from '../../../../shared/service/message-sweet-alert.service';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-list-discipline',
  templateUrl: './list-discipline.component.html',
  styleUrls: ['./list-discipline.component.scss']
})
export class ListDisciplineComponent implements OnInit {
  disciplines: Discipline[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  trackByDiscipline(index: number, discipline: Discipline): string {
    return discipline.id; // ou qualquer outra propriedade única que identifique a disciplina
  }
  @Input()
  refreshListSubject!: BehaviorSubject<boolean>;

  constructor(
   private readonly disciplineService: DisciplineService,
  ) {
   
  }
  ngOnInit() {
    this.loadDisciplines()
    this.refreshListSubject.subscribe(refresh => {
      if (refresh) {
        this.loadDisciplines();
        this.refreshListSubject.next(false); // Resetar o sinal após atualizar
      }
    });
  }



  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadDisciplines();
  }

  addStudent(index: number): void {
    const discipline = this.disciplines[index];

    Swal.fire({
      title: 'Send student email',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add student',
      showLoaderOnConfirm: true,
      preConfirm: (email: string) => this.disciplineService.addStudentToDiscipline(email, discipline.id),
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        MessageSweetAlertService.success('Student added successfully!');
      }
    });
  }

  onDeleteDiscipline(index: number): void {
    const disciplineToDelete = this.disciplines[index];

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${disciplineToDelete.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.disciplineService.delete(disciplineToDelete.id).subscribe({
          next: () => {
            this.loadDisciplines();
            MessageSweetAlertService.success('Discipline deleted successfully!');
          },
          error: (err) => {
            console.error('Error deleting discipline:', err);
            MessageSweetAlertService.error('Failed to delete discipline. Please try again.');
          }
        });
      }
    });
  }

  private loadDisciplines(): void {
    this.disciplineService.paginationDiscipline(this.pageSize, this.currentPage).subscribe({
      next: (response: any) => {
        this.disciplines = response.data;
        this.totalItems = response.items;
      },
      error: (err) => {
        console.error('Error loading disciplines:', err);
        MessageSweetAlertService.error('Failed to load disciplines. Please try again.');
      }
    });
  }
}
