import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { AlertFirebaseService } from '../services/alert/alert.firebase.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

class MockAlertFirebaseService {
  createAlert(){}
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let alertFirebaseService: AlertFirebaseService;
  let matSnackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatSelectModule,
        NgxMaterialTimepickerModule,
        MatSnackBarModule
      ],
      declarations: [FormComponent],
      providers: [{ provide: AlertFirebaseService, useClass: MockAlertFirebaseService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    matSnackBar = TestBed.get(MatSnackBar);
    alertFirebaseService = TestBed.get(AlertFirebaseService);
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  // Classe de Equivalência - Horário - válida
  it(`Dado que o horário seja selecionado
      Então o formulário é válido`, () => {
    // Setando valores
    const time = component.alertForm.controls['time'];
    time.setValue('12:00 AM');

    // Verificando erros
    const errors = time.errors || {};

    // Validando
    expect(time.valid).toBeTruthy();
    expect(errors).toEqual({});
  });

    // Classe de Equivalência - Horário - inválida
  it(`Dado que o horário NÃO seja selecionado
      Então o formulário é inválido`, () => {
    // Setando valores
    const time = component.alertForm.controls['time'];
    time.setValue(null);

    // Verificando erros
    const errors = time.errors || {};

    // Validando
    expect(time.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();
  });

  // Classe de Equivalência - Localização - válida
  it(`Dado que a localização seja selecionado
      Então o formulário é válido`, () => {
    // Setando valores
    const local = component.alertForm.controls['local'];
    local.setValue('12:00 AM');

    // Verificando erros
    const errors = local.errors || {};

    // Validando
    expect(local.valid).toBeTruthy();
    expect(errors).toEqual({});
  });

  // Classe de Equivalência - Localização - inválida
  it(`Dado que a localização NÃO seja selecionada
      Então o formulário é inválido`, () => {
    // Setando valores
    const local = component.alertForm.controls['local'];
    local.setValue(null);

    // Verificando erros
    const errors = local.errors || {};

    // Validando
    expect(local.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();
  });
  
  // Classe de Equivalência - Descrição - válida
  it(`Dado que a descrição seja fornecida
      Então o formulário é válido`, () => {
    // Setando valores
    const description = component.alertForm.controls['description'];
    description.setValue('12:00 AM');
    
    // Verificando erros
    const errors = description.errors || {};

    // Validando
    expect(description.valid).toBeTruthy();
    expect(errors).toEqual({});
  });


  // Classe de Equivalência - Descrição - inválida
  it(`Dado que a descriçã NÃO seja fornecida
      Então o formulário é inválido`, () => {
    // Setando valores
    const description = component.alertForm.controls['description'];
    description.setValue(null);

    // Verificando erros
    const errors = description.errors || {};

    // Validando
    expect(description.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();
  });

  // Tabela de Decisão - 1
  it(`Dado que o serviço de inserir alerta retorne sucesso
      Um snackbar deve ser aberto com mensagem de sucesso`, () => {
    // Mockando serviços
    spyOn(alertFirebaseService, 'createAlert').and.returnValue(Promise.resolve());
    spyOn(matSnackBar, 'open');

    // Executando métodos de inserir alerta
    const btn = fixture.nativeElement.querySelector('.submit-button');
    btn.click();

    // Validando snackbar
    expect(matSnackBar.open).toHaveBeenCalledWith('Seu alerta foi enviado!', 'Fechar', { duration: 3000 });
  });

  // Tabela de Decisão - 2
  it(`Dado que o serviço de inserir alerta retorne falha
      Um snackbar deve ser aberto com mensagem de falha`, () => {

    // Mockando serviços
    const error = {message: "errorMessage"};
    spyOn(alertFirebaseService, 'createAlert').and.returnValue(Promise.reject(error));
    spyOn(matSnackBar, 'open');

    // Executando métodos de inserir alerta
    const btn = fixture.nativeElement.querySelector('.submit-button');
    btn.click();

    // Validando snackbar
    expect(matSnackBar.open).toHaveBeenCalledWith(error.message, 'Fechar', { duration: 3000 });
  });
});
