import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    document.body.className = theme;
  }
}
