import { TestBed, async } from '@angular/core/testing';
import { AlertFacade } from './AlertFacade';
import { AlertFirebaseService } from '../services/alert/alert.firebase.service';
import { of } from 'rxjs';
import { DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

class MockAlertFirebaseService {
  getAlert() {}
  updateAlert() {}
  deleteAlert() {}
  getAlerts() {}
  searchAlerts() {}
  createAlert() {}
}

describe('AlertFacade', () => {
  let alertFacade: AlertFacade;
  let alertFirebaseService: AlertFirebaseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AlertFacade, { provide: AlertFirebaseService, useClass: MockAlertFirebaseService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    alertFirebaseService = TestBed.get(AlertFirebaseService);
    alertFacade = TestBed.get(AlertFacade);
  });

  it(`Dado o AlertFacade
      Quando getAlert for chamado
      Então o AlertFirebaseService deve ser chamado com userKey`, () => {
    const alert = { payload: { doc: { data: () => {} } } };
    spyOn(alertFirebaseService, 'getAlert').and.returnValue(of(alert));
    const testUserKey = 'userKey';

    alertFacade.getAlert$(testUserKey);

    expect(alertFirebaseService.getAlert).toHaveBeenCalledWith(testUserKey);
  });

  it(`Dado o AlertFacade
      Quando updateAlert for chamado
      Então o AlertFirebaseService deve ser chamado com userKey`, () => {
    spyOn(alertFirebaseService, 'updateAlert').and.returnValue(Promise.resolve());
    const testUserKey = 'userKey';
    const newValue = 'newValue';

    alertFacade.updateAlert(testUserKey, newValue);

    expect(alertFirebaseService.updateAlert).toHaveBeenCalledWith(testUserKey, newValue);
  });

  it(`Dado o AlertFacade
      Quando deleteAlert for chamado
      Então o AlertFirebaseService deve ser chamado com userKey`, () => {
    spyOn(alertFirebaseService, 'deleteAlert').and.returnValue(Promise.resolve());
    const testUserKey = 'userKey';

    alertFacade.deleteAlert(testUserKey);

    expect(alertFirebaseService.deleteAlert).toHaveBeenCalledWith(testUserKey);
  });

  it(`Dado o AlertFacade
      Quando getAlerts for chamado
      Então o AlertFirebaseService deve ser chamado com userKey`, () => {
    const alerts = [{ payload: { doc: { data: () => {} } } }];
    spyOn(alertFirebaseService, 'getAlerts').and.returnValue(of(alerts));

    alertFacade.getAlerts();

    expect(alertFirebaseService.getAlerts).toHaveBeenCalledTimes(1);
  });

  it(`Dado o AlertFacade
      Quando searchAlerts for chamado
      Então o AlertFirebaseService deve ser chamado com userKey`, () => {
    const docChangeAction: DocumentChangeAction<unknown> = null;
    const ret = of([docChangeAction]);

    spyOn(alertFirebaseService, 'searchAlerts').and.returnValue(ret);
    const testUserKey = 'userKey';

    alertFacade.searchAlerts(testUserKey);

    expect(alertFirebaseService.searchAlerts).toHaveBeenCalledWith(testUserKey);
  });

  it(`Dado o AlertFacade
      Quando createAlert for chamado
      Então o AlertFirebaseService deve ser chamado com userKey`, () => {
    const ret: Promise<DocumentReference> = new Promise(() => {});
    spyOn(alertFirebaseService, 'createAlert').and.returnValue(ret);
    const testUserKey = 'userKey';

    alertFacade.createAlert(testUserKey);

    expect(alertFirebaseService.createAlert).toHaveBeenCalledWith(testUserKey);
  });
});
