import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  constructor(private service : UserService){
  }
}
