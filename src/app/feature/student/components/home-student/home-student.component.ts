import { Component, Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Student } from '../../../../shared/model/student.model';
import { UserStorageService } from '../../../../core/storage/user-storage.service';


@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.scss',
})

export class HomeStudentComponent {

  student: Student | undefined;
  total_disciplines : number = 20;

  
  constructor(private storage : UserStorageService){
    this.student = storage.userSaved as Student;
  }

}
