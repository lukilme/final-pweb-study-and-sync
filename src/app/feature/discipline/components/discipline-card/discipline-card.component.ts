import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Discipline } from '../../../../shared/model/discipline.model';
import Swal from 'sweetalert2';
import { DisciplineService } from '../../service/discipline.service';

@Component({
  selector: 'app-discipline-card',
  templateUrl: './discipline-card.component.html',
  styleUrl: './discipline-card.component.scss'
})
export class DisciplineCardComponent {
  @Input() discipline!: Discipline; 
  @Input() index!: number;
  @Output() delete = new EventEmitter<number>();

  constructor(private service : DisciplineService){

  }

  deleteThis(){
    console.log(this.discipline.id);
    this.delete.emit(this.index); 
  }

}
