import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioFirestoreService {

  colecaoUsuarios: AngularFirestoreCollection<User>;
  NOME_COLECAO = 'usuarios';

  constructor(private afs: AngularFirestore) { 
    this.colecaoUsuarios = afs.collection(this.NOME_COLECAO);
  }
 
  listar(): Observable<User[]> {
    // usando options para idField para mapear o id gerado pelo firestore para o campo id de usuário
    return this.colecaoUsuarios.valueChanges({idField: 'id'});
  }

  
 
 
}
