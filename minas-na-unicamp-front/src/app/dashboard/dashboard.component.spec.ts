import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AlertFirebaseService } from '../services/alert/alert.firebase.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

class MockAlertFirebaseService {
  getAlerts() {
    return of();
  }
}

const mockAlerts = [
  { 
    alertType: "alerta",
    description: "Descrição do Alerta 1",
    lat: -22.817259,
    lng: -47.069679,
    local: "Praça do Ciclo Básico",
    time: "12:00 AM",
    user: "anon"
  },
  { 
    alertType: "alerta",
    description: "Descrição do Alerta 2",
    lat: -22.82261,
    lng: -47.06775,
    local: "Praça da Paz",
    time: "10:30 PM",
    user: "anon"
  }
]


const mockGetAlertsReturn = [
  {
    payload: {
      doc: {
        data: () => mockAlerts[0]
      }
    }
  },
  {
    payload: {
      doc: {
        data: () => mockAlerts[1]
      }
    }
  },
]


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let alertFirebaseService: AlertFirebaseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatSelectModule, FormsModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule ],
      declarations: [ DashboardComponent ],
      providers: [{ provide: AlertFirebaseService, useClass: MockAlertFirebaseService }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    alertFirebaseService = TestBed.get(AlertFirebaseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tabela de Decisão teste 1
  it(`Dado que o input de filtro esteja preenchido e o dropdown de filtro selecionado
      Então o filtro deve ser feito em conjunto do input e do dropdown`, () => {

    // Mockando serviço de Alerta
    spyOn(alertFirebaseService, 'getAlerts').and.returnValue(of(mockGetAlertsReturn));

    // Pegando componentes da interface
    const textInput = fixture.nativeElement.querySelector('.text-filter');
    const buttonFilter = fixture.nativeElement.querySelector('.button-filter');    

    // Setando valores
    textInput.value = "Alerta";
    component.filter.local = 'Praça do Ciclo Básico';
    textInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    // Executando ação click no botão - filtro
    component.ngOnInit();
    buttonFilter.click();

    // Valores esperados - filtro conjunto
    expect(component.filter.result).toEqual([mockAlerts[0]]);
  });

  
  // Tabela de Decisão teste 2
  it(`Dado que o input de filtro esteja preenchido e o dropdown de filtro NÃO selecionado
      Então o filtro deve ser feito a partir do input apenas`, () => {

    // Mockando serviço de Alerta
    spyOn(alertFirebaseService, 'getAlerts').and.returnValue(of(mockGetAlertsReturn));

    // Pegando componentes da interface
    const textInput = fixture.nativeElement.querySelector('.text-filter');
    const buttonFilter = fixture.nativeElement.querySelector('.button-filter');    

    // Setando valores
    textInput.value = "Descrição do Alerta 1";
    textInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    // Executando ação click no botão - filtro
    component.ngOnInit();
    buttonFilter.click();

    // Valores esperados - filtro input
    expect(component.filter.result).toEqual([mockAlerts[0]]);

  });

  // Tabela de Decisão teste 3
  it(`Dado que o input de filtro NÃO esteja preenchido e o dropdown de filtro esteja selecionado
      Então o filtro deve ser feito a partir do dropdown apenas`, () => {
      
    // Mockando serviço de Alerta
    spyOn(alertFirebaseService, 'getAlerts').and.returnValue(of(mockGetAlertsReturn));

    // Pegando componentes da interface
    //const textInput = fixture.nativeElement.querySelector('.text-filter');
    const buttonFilter = fixture.nativeElement.querySelector('.button-filter');    

    // Setando valores
    component.filter.local = 'Praça da Paz';

    // Executando ação click no botão - filtro
    component.ngOnInit();
    buttonFilter.click();

    // Valores esperados - filtro local
    expect(component.filter.result).toEqual([mockAlerts[1]]);

  });

  // Tabela de Decisão teste 4
  it(`Dado que o input de filtro NÃO esteja preenchido e o dropdown de filtro NÃO selecionado
      Então o filtro não deve ser aplicado`, () => {

    // Mockando serviço de Alerta
    spyOn(alertFirebaseService, 'getAlerts').and.returnValue(of(mockGetAlertsReturn));

    // Pegando componentes da interface
    //const textInput = fixture.nativeElement.querySelector('.text-filter');
    const buttonFilter = fixture.nativeElement.querySelector('.button-filter');
    
     // Setando valores
     component.filter.local = '';
     component.filter.text = '';
    
    // Executando ação click no botão - filtro
    component.ngOnInit();
    buttonFilter.click();

    // Valores esperados - sem filtro
    expect(component.filter.result).toEqual(mockAlerts);   
  });
});
