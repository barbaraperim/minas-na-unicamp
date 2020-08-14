import { TestBed } from '@angular/core/testing';

import { SecureInnerPagesGuard } from './secure-inner-pages.guard';
import { AuthService } from '../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

class MockAuthService {
  isLoggedIn: true;
}

describe('SecureInnerPagesGuard', () => {
  let guard: SecureInnerPagesGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
    });
    guard = TestBed.inject(SecureInnerPagesGuard);
  });

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it(`Dado o secure-inner-page guard
      Quando o usuário estiver logado
      Então o guard deve retornar true`, () => {
    Object.defineProperty(authService, 'isLoggedIn', { value: true });
    spyOn(router, 'navigate');

    guard = new SecureInnerPagesGuard(authService, router);
    const ret = guard.canActivate();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(ret).toEqual(true);
  });

  it(`Dado o secure-inner-page guard
  Quando o usuário não estiver logado
  Então ele deve receber uma mensagem avisando e ser redirecionado para /form`, () => {
    Object.defineProperty(authService, 'isLoggedIn', { value: false });
    spyOn(router, 'navigate');

    guard = new SecureInnerPagesGuard(authService, router);
    const ret = guard.canActivate();

    expect(router.navigate).toHaveBeenCalledWith(['formulario']);
    expect(ret).toEqual(false);
  });
});
