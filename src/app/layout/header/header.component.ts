import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../../core/storage/user-storage.service';
import { Router } from '@angular/router';
import { User } from '../../shared/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] 
})
export class HeaderComponent implements OnInit {
  currentUser: User | null | undefined;
  currentButton: string;

  constructor(
    private userStorage: UserStorageService,
    private router: Router
  ) {
    if(location.pathname=='/home' || location.pathname == '/'){
      this.currentButton = "user"
    }else{
      this.currentButton = "home";
    }
  }

  ngOnInit(): void {
    this.isLogged();
 
  
  }

  isLogged(): void {
    this.currentUser = this.userStorage.getUser();
    if (this.currentUser != null) {
      console.log(location.pathname)
      if(location.pathname=='/'){
        this.router.navigate(['home']);
       
      }else{
        this.router.navigate([location.pathname]);
  
      }
    } else {
      if (this.router.url !== '/') { 
        this.router.navigate(['']);
      }
    }
  }

  logout(): void {
    this.userStorage.clearAllData();
    location.reload();
  }

  changePerfil(): void {
    if (this.currentUser) { 
      this.router.navigate([`user/${this.currentUser.id}`]);
      this.currentButton = 'home';
    }
  }

  changeHome(){
    if (this.currentUser) { 
      this.router.navigate([`home`]);
      this.currentButton = 'user';
    }
  }
}
