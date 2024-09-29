import { Component, Input, Output, EventEmitter, inject, ViewChild } from '@angular/core';
import { Discipline } from '../../../../shared/model/discipline.model';
import { UserStorageService } from '../../../../core/storage/user-storage.service';
import { CreateDisciplineFormComponent } from '../create-discipline-form/create-discipline-form.component';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-discipline-card',
  templateUrl: './discipline-card.component.html',
  styleUrls: ['./discipline-card.component.scss']
})
export class DisciplineCardComponent {
  admMode = true;
  readonly dialog = inject(MatDialog);
  refreshListSubject = new BehaviorSubject<boolean>(false);
  @Input() discipline!: Discipline;
  @Input() index!: number;
  @Output() addStudentEvent = new EventEmitter<number>();
  @Output() deleteDisciplineEvent = new EventEmitter<number>();
  @Output() leaveDisciplineEvent = new EventEmitter<string>();



  constructor(private storageUser :UserStorageService){
    if(storageUser.userSaved?.status!='teacher'){
      this.admMode = false;
    }
  }


  addStudent(): void {
    this.addStudentEvent.emit(this.index);
  }

  deleteThis(): void {
    this.deleteDisciplineEvent.emit(this.index);
  }

  leaveThis(){
    this.leaveDisciplineEvent.emit(this.discipline.id);
  }

  
  updateDiscipline() {
    const dialogRef = this.dialog.open(CreateDisciplineFormComponent, {
      data: { discipline: this.discipline }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshListSubject.next(true);
      }
    });
  }
  
  
}


