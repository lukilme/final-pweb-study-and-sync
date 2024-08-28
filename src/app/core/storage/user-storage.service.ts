import { Injectable } from '@angular/core';
import { User } from '../../shared/model/user.model';
import { Student } from '../../shared/model/student.model';
import { Teacher } from '../../shared/model/teacher.model';

export interface SavedUser {
  id: string;
  name: string;
  status: string;
  birthday: Date;
  disciplines: string[];
  email: string;
  course?: string;
  semester?: number;
  qualification?: string;
}

@Injectable({ providedIn: 'root' }) 
export class UserStorageService {
  private readonly USER_KEY = 'user';
  userSaved : User | null | undefined;

  saveUser(user: Teacher | Student): void { 
   
    const savedUser: SavedUser = this.buildUser(user);

    const jsonData = JSON.stringify(savedUser);
    localStorage.setItem(this.USER_KEY, jsonData);
  }

  buildUser(data:  Teacher | Student): SavedUser {
    const baseUser: SavedUser = {
      id: data.id,
      name: data.name,
      status: data.status,
      birthday: data.birthday,
      disciplines: data.disciplines,
      email: data.email
    };
  
    if (data instanceof Teacher) {
      return {
        ...baseUser,
        qualification: data.qualification
      };
    } else {
      return {
        ...baseUser,
        course: data.course,
        semester: data.semester
      };
    }
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