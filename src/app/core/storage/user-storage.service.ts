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

  saveUser(user: User): void { 
    const savedUser: SavedUser = { 
      id: user.getId(),
      name: user.name,
      status: user.status,
      birthday: user.birthday, 
    };

    const jsonData = JSON.stringify(savedUser);
    localStorage.setItem(this.USER_KEY, jsonData);
  }

  getUser(): SavedUser | null {
    const storedData = localStorage.getItem(this.USER_KEY);
    if (!storedData) {
      return null;
    }

    try {
      return JSON.parse(storedData) as SavedUser;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  }
  clearAllData(): void {
    localStorage.clear();
  }
}