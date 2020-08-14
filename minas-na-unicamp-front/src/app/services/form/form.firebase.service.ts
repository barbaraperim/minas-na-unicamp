import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FormFirebaseService {

  constructor(public db: AngularFirestore) {}

  getForms(){
    return this.db.collection('form').snapshotChanges();
  }
}
