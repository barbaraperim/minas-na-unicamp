import { Injectable } from '@angular/core';
import { AlertFirebaseService } from '../services/alert/alert.firebase.service';

@Injectable()
export class AlertFacade {
  constructor(private alertFirebaseService: AlertFirebaseService) {}

  getAlert$(userKey) {
    let alert = '';
    this.alertFirebaseService.getAlert(userKey).subscribe((r) => {
      alert = r.payload.doc.data();
    });
    return alert;
  }

  updateAlert(userKey, value) {
    return this.alertFirebaseService.updateAlert(userKey, value);
  }

  deleteAlert(userKey) {
    return this.alertFirebaseService.deleteAlert(userKey);
  }

  getAlerts() {
    let alerts = [];
    this.alertFirebaseService.getAlerts().subscribe((r) => {
      alerts = r.map((alert) => alert.payload.doc.data());
    });

    return alerts;
  }

  searchAlerts(searchValue) {
    return this.alertFirebaseService.searchAlerts(searchValue);
  }

  createAlert(value) {
    return this.alertFirebaseService.createAlert(value);
  }
}
