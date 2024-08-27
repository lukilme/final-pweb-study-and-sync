import { Component, effect, Input, OnInit } from '@angular/core';
import { DisciplineService } from '../../service/discipline.service';
import { PageEvent } from '@angular/material/paginator';
import { Discipline } from '../../../../shared/model/discipline.model';
import { MessageSweetAlertService } from '../../../../shared/service/message-sweet-alert.service';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
import { UserStorageService } from '../../../../core/storage/user-storage.service';


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
    return discipline.id;
  }
  @Input()
  refreshListSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
   private disciplineService: DisciplineService,
   private storage : UserStorageService
  ) {
   
  }

  ngOnInit() {
    this.loadDisciplines()
    this.refreshListSubject.subscribe(refresh => {
      if (refresh) {
        this.loadDisciplines();
        this.refreshListSubject.next(false); 
      }
    });
  }

  leaveDiscipline(id : string){
    console.log(id, this.storage.userSaved?.id)
    if(this.storage.userSaved){
      console.log(this.storage.userSaved)
      this.disciplineService.leaveDiscipline( this.storage.userSaved?.id, id)
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
      title: 'Send student email',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add student',
      showLoaderOnConfirm: true,
      preConfirm: (email: string) => 
        this.disciplineService.addStudentToDiscipline(email, discipline.id).toPromise().catch(error => {
          Swal.showValidationMessage(error.message);
        }),
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed && !Swal.getValidationMessage()) {
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
        this.disciplineService.deleteDiscipline(disciplineToDelete);
        this.loadDisciplines();
        MessageSweetAlertService.success("Bye bye discipline");
      }
    });
  }

  loadDisciplines(): void {
    this.disciplineService.paginationDiscipline(this.pageSize, this.currentPage).subscribe({
      next: (response: Object) => {
        const dataResponse = response as { data: Discipline[] };
 
        this.disciplines = [];
  
        if (this.storage.userSaved) {
          const listDiscipline: string[] = this.storage.userSaved.disciplines;
          listDiscipline.forEach((discipline_id) => {
            console.log('Searching for discipline ID:', discipline_id);
            const found = dataResponse.data.find((value: Discipline) => value.id === discipline_id);
            if (found) {
              this.disciplines.push(found);
            }
          });
        }
  
        console.log('Disciplines loaded:', this.disciplines);
        this.totalItems = this.disciplines.length;
      },
      error: (err) => {
        console.error('Error loading disciplines:', err);
        MessageSweetAlertService.error('Failed to load disciplines. Please try again.');
      }
    });
  }
  
}
