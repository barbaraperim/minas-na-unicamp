import { TestBed } from '@angular/core/testing';
import { AlertFirebaseService } from './alert.firebase.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

const firebase = require('@firebase/testing');

const app = firebase.initializeTestApp({
  projectId: 'minas-na-unicamp',
  auth: {
    uid: 'uid',
    firebase: {
      sign_in_provider: 'google.com',
    },
  },
});

describe('AlertFirebaseService', () => {
  let service: AlertFirebaseService;
  let db: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule, AngularFireAuthModule, RouterTestingModule],
    });
    service = TestBed.inject(AlertFirebaseService);
  });

  beforeEach(() => {
    db = TestBed.get(AngularFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /**
  it(`Dado o AlertFirebaseService
  Quando getAlert for chamado
  Então uma chamada deve ser feita com userKey`, () => {
    service.getAlert('key');

    firebase.assertSucceeds(app.firestore().collection('alerta').doc('test-document').get());
  });
  
  it(`Dado o AlertFirebaseService
  Quando updateAlert for chamado
  Então uma chamada deve ser feita com userKey e value`, () => {
    spyOn(alertFirebaseService, 'updateAlert').and.returnValue(Promise.resolve());
    const testUserKey = 'userKey';
    const newValue = 'newValue';

    service.updateAlert(testUserKey, newValue);

    expect(alertFirebaseService.updateAlert).toHaveBeenCalledWith(testUserKey, newValue);
  });

  it(`Dado o AlertFirebaseService
  Quando deleteAlert for chamado
  Então uma chamada deve ser feita com userKey`, () => {
    spyOn(alertFirebaseService, 'deleteAlert').and.returnValue(Promise.resolve());
    const testUserKey = 'userKey';

    service.deleteAlert(testUserKey);

    expect(alertFirebaseService.deleteAlert).toHaveBeenCalledWith(testUserKey);
  });

  it(`Dado o AlertFacade
  Quando getAlerts for chamado
  Então uma chamada deve ser feita`, () => {
    const alerts = [{ payload: { doc: { data: () => {} } } }];
    spyOn(alertFirebaseService, 'getAlerts').and.returnValue(of(alerts));

    service.getAlerts();

    expect(alertFirebaseService.getAlerts).toHaveBeenCalledTimes(1);
  });

  it(`Dado o AlertFirebaseService
  Quando searchAlerts for chamado
  Então uma chamada deve ser feita`, () => {
    const docChangeAction: DocumentChangeAction<unknown> = null;
    const ret = of([docChangeAction]);

    spyOn(alertFirebaseService, 'searchAlerts').and.returnValue(ret);
    const testUserKey = 'userKey';

    service.searchAlerts(testUserKey);

    expect(alertFirebaseService.searchAlerts).toHaveBeenCalledWith(testUserKey);
  });

  it(`Dado o AlertFirebaseService
  Quando createAlert for chamado
  Então o AlertFirebaseService deve ser chamado com value`, () => {
    const ret: Promise<DocumentReference> = new Promise(() => {});
    spyOn(alertFirebaseService, 'createAlert').and.returnValue(ret);
    const value = 'value';

    service.createAlert(value);

    expect(alertFirebaseService.createAlert).toHaveBeenCalledWith(testUserKey);
  });*/
});
