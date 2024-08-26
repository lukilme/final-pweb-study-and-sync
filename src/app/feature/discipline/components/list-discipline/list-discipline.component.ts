import { Component, OnInit } from '@angular/core';
import { DisciplineService } from '../../service/discipline.service';
import { PageEvent } from '@angular/material/paginator';
import { Discipline } from '../../../../shared/model/discipline.model';
import { MessageSweetAlertService } from '../../../../shared/service/message-sweet-alert.service';

@Component({
  selector: 'app-list-discipline',
  templateUrl: './list-discipline.component.html',
  styleUrls: ['./list-discipline.component.scss'] // Corrigido o nome da propriedade para styleUrls
})
export class ListDisciplineComponent implements OnInit {
  disciplines: Discipline[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private service: DisciplineService) {}

  ngOnInit(): void {
    this.loadDisciplines(this.pageSize, this.currentPage);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadDisciplines(this.pageSize, this.currentPage);
  }

  onDeleteDiscipline(index: number): void {
    const disciplineToDelete = this.disciplines[index];
    this.service.delete(disciplineToDelete.id).subscribe({
      next: () => {
        this.loadDisciplines(this.pageSize, this.currentPage);
        MessageSweetAlertService.sucesso("Deleted discipline!")
      },
      error: () => {
        console.error('Error deleting discipline');
      }
    });
  }

  private loadDisciplines(limit: number, page: number): void {
    this.service.paginationDiscipline(limit, page).subscribe({
      next: (response: any) => {
        this.disciplines = response.data;
        this.totalItems = response.items;
      },
      error: () => {
        console.error('Error loading disciplines');
      }
    });
  }
}
