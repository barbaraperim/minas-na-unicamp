import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertFirebaseService {
  constructor(public db: AngularFirestore) {}

  getAlert(userKey): Observable<any> {
    return this.db.collection('alert').doc(userKey).snapshotChanges();
  }

  updateAlert(userKey, value) {
    return this.db.collection('alert').doc(userKey).set(value);
  }

  deleteAlert(userKey) {
    return this.db.collection('alert').doc(userKey).delete();
  }

  getAlerts(): Observable<any> {
    return this.db.collection('alert').snapshotChanges();
  }

  searchAlerts(searchValue) {
    return this.db
      .collection('alert', (ref) => ref.where('nameToSearch', '>=', searchValue).where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  createAlert(value) {
    return this.db.collection('alert').add({
      description: value.description,
      local: value.local,
      time: value.time,
      user: value.user,
      alertType: value.alertType,
      lat: value.lat,
      lng: value.lng,
    });
  }
}
