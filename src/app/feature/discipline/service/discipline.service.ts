import { Injectable } from '@angular/core';
import { ServiceAbstract } from '../../../core/util/service.abstract';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DisciplineStorageService } from '../../../core/storage/discipline-storage.service';
import { Discipline } from '../../../shared/model/discipline.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService extends ServiceAbstract<Discipline> {
  override URL_TARGET = "http://localhost:3000/discipline";

  constructor(
    httpClient: HttpClient,
    private route: Router,
    private storage: DisciplineStorageService
  ) {
    super(httpClient);
  }


  createDiscipline(){
    const discipline = new Discipline("asda","adsad","fdfasdsad");
    console.log("okok")
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
