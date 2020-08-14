import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmationComponent } from './email-confirmation.component';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockComponent } from 'ng-mocks';

class MockAuthService {
  sendVerificationMail() {}
}

describe('EmailConfirmationComponent', () => {
  let component: EmailConfirmationComponent;
  let fixture: ComponentFixture<EmailConfirmationComponent>;
  let authService: AuthService;
  let matSnackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [EmailConfirmationComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(EmailConfirmationComponent);
    component = fixture.componentInstance;
    matSnackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dado o botão resendEmail 
      Quando for clicado e retornar com sucesso
      O snackbar vai abrir com mensagem de sucesso`, () => {
    spyOn(authService, 'sendVerificationMail').and.returnValue(Promise.resolve());
    spyOn(matSnackBar, 'open');

    const btn = fixture.nativeElement.querySelector('.button--confirmation');
    btn.click();

    expect(matSnackBar.open).toHaveBeenCalledWith('Email enviado com sucesso', 'Fechar', { duration: 3000 });
  });

  it(`Dado o botão resendEmail 
      Quando for clicado e retornar com erro
      O snackbar vai abrir com mensagem de erro`, () => {
    spyOn(authService, 'sendVerificationMail').and.returnValue(Promise.reject(new Error('fail')));
    spyOn(matSnackBar, 'open');

    const btn = fixture.nativeElement.querySelector('.button--confirmation');
    btn.click();

    expect(matSnackBar.open).toHaveBeenCalledWith('Falha ao enviar email, tente novamente', 'Fechar', { duration: 3000 });
  });
});
