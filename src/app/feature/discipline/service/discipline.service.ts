import { Injectable } from '@angular/core';
import { ServiceAbstract } from '../../../core/util/service.abstract';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DisciplineStorageService } from '../../../core/storage/discipline-storage.service';
import { Discipline } from '../../../shared/model/discipline.model';
import { UserService } from '../../user/service/user.service';
import { DisciplineFormInterface } from '../../../core/interfaces/discipline.form.interface';
import { Observable } from 'rxjs';

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
}
