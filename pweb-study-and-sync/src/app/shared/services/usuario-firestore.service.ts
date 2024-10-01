import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../model/user.model';
import { UserCredential } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class UsuarioFirestoreService {
  
  colecaoUsuarios: AngularFirestoreCollection<User>;
  NOME_COLECAO = 'usuarios';

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth  // Injetando o serviço de autenticação
  ) { 
    this.colecaoUsuarios = afs.collection(this.NOME_COLECAO);
  }

  // Listar todos os usuários cadastrados no Firestore
  listar(): Observable<User[]> {
    return this.colecaoUsuarios.valueChanges({ idField: 'id' });
  }

  // Inserir um novo usuário no Firestore
  inserir(usuario: User): Observable<object> {
    return from(this.colecaoUsuarios.add(Object.assign({}, usuario)));
  }

  // Registrar um novo usuário com email e senha no Firebase Authentication e salvar no Firestore
  registrarUsuario(email: string, senha: string, usuario: User): Observable<UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, senha).then(cred => {
      // Depois de registrado, insere os dados adicionais do usuário no Firestore
      this.colecaoUsuarios.doc(cred.user?.uid).set(usuario);
      return cred;
    }));
  }

  // Realizar login de um usuário usando email e senha
  login(email: string, senha: string): Observable<UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, senha));
  }

  // Logout do usuário
  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
