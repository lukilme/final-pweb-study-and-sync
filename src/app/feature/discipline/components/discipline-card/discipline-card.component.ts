import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Discipline } from '../../../../shared/model/discipline.model';

@Component({
  selector: 'app-discipline-card',
  templateUrl: './discipline-card.component.html',
  styleUrl: './discipline-card.component.scss'
})
export class DisciplineCardComponent {
  @Input() discipline!: Discipline; 
  @Input() index!: number;
  @Output() delete = new EventEmitter<number>();

  deleteThis(){
    console.log(this.discipline.id);
    this.delete.emit(this.index); 
  }
}
