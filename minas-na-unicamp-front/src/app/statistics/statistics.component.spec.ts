import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatisticsComponent } from './statistics.component';
import * as Highcharts from 'highcharts';
import ExportingModule from 'highcharts/modules/exporting';
ExportingModule(Highcharts);
import { FormFirebaseService } from '../services/form/form.firebase.service';
import { Observable } from 'rxjs';

class MockFormFirebaseService {
  getForms(): Observable<null> {
    return new Observable();
  }
}

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let formFirebaseService: FormFirebaseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsComponent],
      providers: [{ provide: FormFirebaseService, useClass: MockFormFirebaseService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    formFirebaseService = TestBed.get(FormFirebaseService);
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
