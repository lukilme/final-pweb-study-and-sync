import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Discipline } from '../../shared/model/discipline.model';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Método para salvar disciplina no Firestore
 saveDiscipline(discipline: Discipline): Observable<void> {
    const disciplineData = {
      name: discipline.name,
      color: discipline.color,
    };
    return from(this.firestore.collection('disciplines').doc(discipline.id).set(disciplineData));
  }

  // Método para ler disciplina pelo ID e garantir que não é undefined
  getDiscipline(id: string): Observable<Discipline> {
    return this.firestore.collection('disciplines').doc<Discipline>(id).valueChanges().pipe(
      filter((discipline): discipline is Discipline => discipline !== undefined) // Filtra undefined
    );
  }
}
