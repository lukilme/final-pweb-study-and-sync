import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRestService {
  private readonly apiUrl = 'https://firestore.googleapis.com/v1beta1/projects/study-and-sync/databases/(default)/documents/usuarios';

  constructor(private http: HttpClient) {}

  // Método para obter todos os usuários
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Método para obter um usuário específico pelo ID
  getUsuario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Método para adicionar um novo usuário
  addUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  // Método para atualizar um usuário
  updateUsuario(id: string, usuario: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, usuario);
  }

  // Método para deletar um usuário
  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
