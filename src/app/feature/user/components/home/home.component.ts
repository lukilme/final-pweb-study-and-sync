import { Component, ɵRuntimeErrorCode } from '@angular/core';
import { UserStorageService } from '../../../../core/storage/user-storage.service';
import { Router } from '@angular/router';
import { User } from '../../../../shared/model/user.model';
import { Student } from '../../../../shared/model/student.model';
import { Teacher } from '../../../../shared/model/teacher.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  actual_user : User | Teacher | undefined ;

  constructor(private storage : UserStorageService, private route: Router){
    try {
      console.log(storage.userSaved)
      if(storage.userSaved== undefined){
        storage.getUser()
        if(storage.userSaved == null){
          throw new Error("User not stored")
        }
      }
      this.actual_user = storage.userSaved;
    } catch (error) {
      route.navigate([""]);
    }
  }
}
