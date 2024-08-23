import { Injectable } from '@angular/core';
import { User } from '../../shared/model/user.model';

export interface SavedUser {
  id: string;
  name: string;
  status: string;
  birthday: Date;

}

@Injectable({ providedIn: 'root' }) 
export class UserStorageService {
  private readonly USER_KEY = 'user';
  userSaved : User | null | undefined;

  saveUser(user: User): void { 
    const savedUser: SavedUser = { 
      id: user.id,
      name: user.name,
      status: user.status,
      birthday: user.birthday, 
    };

    const jsonData = JSON.stringify(savedUser);
    localStorage.setItem(this.USER_KEY, jsonData);
  }

  getUser(): User | null {
    const storedData = localStorage.getItem(this.USER_KEY);
    if (!storedData) {
      return null;
    }

    try {
      this.userSaved = JSON.parse(storedData) as User;
      return this.userSaved;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  }
  clearAllData(): void {
    localStorage.clear();
  }
}