import { Component, OnInit } from '@angular/core';
import { UserService } from '../../feature/user/service/user.service';
import { SavedUser, UserStorageService } from '../../core/storage/user-storage.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentUser: SavedUser | null | undefined;

  constructor(
    private userStorage: UserStorageService,
    private router: Router,
    private rotaAtual: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        console.log('A URL mudou para:', event.urlAfterRedirects);
        this.isLogged();
      });
    this.isLogged();
  }

  isLogged(){
    this.currentUser = this.userStorage.getUser();
    if (this.currentUser!=null) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['']);
    }
  }

  logout(){
    this.userStorage.clearAllData();
    this.isLogged();
  }
}
