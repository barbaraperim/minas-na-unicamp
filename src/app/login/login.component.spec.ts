import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockAuthService {
  signIn() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let matSnackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, FormsModule, MatSnackBarModule, MatInputModule, NoopAnimationsModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    matSnackBar = TestBed.get(MatSnackBar);
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // Classe de equivalencia - E-mail - Informação obrigatória - Válido
  it(`Dado que o usuário insira um e-mail
      Então não haverá erro de required no campo`, () => {
      const email = component.form.controls['email'];
      email.setValue('email');
  
      const errors = email.errors || {};
  
      expect(email.valid).toBeFalsy();
      expect(errors['required']).toBeFalsy();
  });

  // Classe de equivalencia - E-mail - Informação obrigatória - Inválido
  it(`Dado que o usuário NÃO insira um e-mail
      Então haverá erro de required no campo`, () => {
      const email = component.form.controls['email'];
      email.setValue(null);
  
      const errors = email.errors || {};
  
      expect(email.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
  });

  // Classe de equivalencia - E-mail - Formado por chars a-Z 0-9 - Inválido
  it(`Dado que o usuário insira um e-mail com caracteres invalidos
      Então haverá erro de pattern no campo`, () => {
      const email = component.form.controls['email'];
      email.setValue('3M4i$&L@teste.com');
  
      const errors = email.errors || {};
  
      expect(email.valid).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();
  });

  // Classe de equivalencia - E-mail - Existir @ entre chars - Inválido
  it(`Dado que o usuário insira um e-mail sem @
      Então haverá erro de pattern no campo`, () => {
      const email = component.form.controls['email'];
      email.setValue('3M4i$&Lteste.com');
  
      const errors = email.errors || {};
  
      expect(email.valid).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();
  });

  // Classe de equivalencia - E-mail - Finalizar com ponto + 2 a 4 chars - Inválido t < 2
  it(`Dado que o usuário insira um e-mail finalizado com um ponto e menos de um char em seguida
      Então haverá erro de pattern no campo`, () => {
      const email = component.form.controls['email'];
      email.setValue('3M4i$&L@teste.c');
  
      const errors = email.errors || {};
  
      expect(email.valid).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();
  });

  // Classe de equivalencia - E-mail - Finalizar com ponto + 2 a 4 chars - Inválido t > 4
  it(`Dado que o usuário insira um e-mail finalizado com um ponto e mais de 4 char em seguida
      Então haverá erro de required no campo`, () => {
      const email = component.form.controls['email'];
      email.setValue('3M4i$&L@teste.comcom');
  
      const errors = email.errors || {};
  
      expect(email.valid).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();
  });

  // Classe de equivalencia - E-mail - Formatação - Válido
  it(`Dado que o usuário insira um e-mail com a formatação correta
      Então não haverá erro no campo`, () => {
      const email = component.form.controls['email'];
      email.setValue('teste@teste.com');
  
      const errors = email.errors || {};
  
      expect(email.valid).toBeTruthy();
      expect(errors['pattern']).toBeFalsy();
  });

  // Classe de equivalencia - Senha - Informação obrigatória - Válido
  it(`Dado que o usuário insira uma senha
      Então não haverá erro de required no campo`, () => {
      const password = component.form.controls['password'];
      password.setValue('password');
  
      const errors = password.errors || {};
  
      expect(password.valid).toBeTruthy();
      expect(errors['required']).toBeFalsy();
  });

  // Classe de equivalencia - Senha - Informação obrigatória - Inválido - t < 1
  it(`Dado que o usuário NÃO insira uma senha
      Então haverá erro de required no campo`, () => {
      const password = component.form.controls['password'];
      password.setValue(null);
  
      const errors = password.errors || {};
  
      expect(password.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
  });

  // Classe de equivalencia - Senha - entre 1 e 30 caracteres - Válido
  it(`Dado que o usuário NÃO insira uma senha
      Então haverá erro de required no campo`, () => {
      const password = component.form.controls['password'];
      password.setValue('12345');
  
      const errors = password.errors || {};
  
      expect(password.valid).toBeTruthy();
      expect(errors).toEqual({});
  });

  // Classe de equivalencia - Senha - entre 1 e 30 caracteres - Inválido - t > 30
  it(`Dado que o usuário NÃO insira uma senha
    Então não haverá erro de required no campo`, () => {
    const password = component.form.controls['password'];
    password.setValue('1'.repeat(31));

    const errors = password.errors || {};
    
    expect(password.valid).toBeFalsy();
    expect(errors['maxlength']).toBeTruthy();
  });

    // Tabela de Decisão - 1
  it(`Dado o botão login 
  Quando for clicado e retornar com sucesso
  O snackbar vai abrir com mensagem de sucesso`, () => {
    spyOn(authService, 'signIn').and.returnValue(Promise.resolve());
    spyOn(matSnackBar, 'open');

    const email = component.form.controls['email'];
    email.setValue('test@email.com');
    const password = component.form.controls['password'];
    password.setValue('123456');

    const btn = fixture.nativeElement.querySelector('.button--login');
    btn.disabled = false;
    btn.click();

    expect(matSnackBar.open).toHaveBeenCalledWith('Bem-Vindo!', 'Fechar', { duration: 3000 });
  });

  // Tabela de Decisão - 2
  it(`Dado o botão login 
  Quando for clicado e retornar com erro
  O snackbar vai abrir com mensagem de erro`, () => {
    spyOn(authService, 'signIn').and.returnValue(Promise.reject(new Error('fail')));
    spyOn(matSnackBar, 'open');

    const email = component.form.controls['email'];
    email.setValue('test@email.com');
    const password = component.form.controls['password'];
    password.setValue('123456');

    const btn = fixture.nativeElement.querySelector('.button--login');
    btn.disabled = false;
    btn.click();

    expect(matSnackBar.open).toHaveBeenCalledWith('fail', 'Fechar', { duration: 3000 });
  });
});
