import { Injectable } from '@angular/core';
import { DisciplineService } from '../../discipline/service/discipline.service';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  constructor(private disciplineService : DisciplineService) {
    
  }
}
