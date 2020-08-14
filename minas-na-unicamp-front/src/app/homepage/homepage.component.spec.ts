import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { AlertFacade } from '../facades/AlertFacade';

class MockAlertFacade {
  getAlerts() {}
}

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let alertFacade: AlertFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      providers: [{ provide: AlertFacade, useClass: MockAlertFacade }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    alertFacade = TestBed.get(AlertFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado o componente Homepage
      Quando iniciar
      Então deve chamar o getAlerts`, () => {
    spyOn(alertFacade, 'getAlerts');

    component.ngOnInit();

    expect(alertFacade.getAlerts).toHaveBeenCalled();
  });
});
