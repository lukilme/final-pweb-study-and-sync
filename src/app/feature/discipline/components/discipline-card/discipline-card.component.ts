import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Discipline } from '../../../../shared/model/discipline.model';

@Component({
  selector: 'app-discipline-card',
  templateUrl: './discipline-card.component.html',
  styleUrls: ['./discipline-card.component.scss']
})
export class DisciplineCardComponent {
  @Input() discipline!: Discipline;
  @Input() index!: number;
  @Output() addStudentEvent = new EventEmitter<number>();
  @Output() deleteDisciplineEvent = new EventEmitter<number>();

  addStudent(): void {
    this.addStudentEvent.emit(this.index);
  }

  deleteThis(): void {
    this.deleteDisciplineEvent.emit(this.index);
  }
  updateDiscipline():void{
    
  }
}
