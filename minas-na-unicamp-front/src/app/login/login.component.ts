import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly EMAIL_PATTERN = /^\w+([\+\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;

  public user: any = {
    email: null,
    password: null,
  };

  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });;
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  login() {
    this.authService.signIn(this.user.email, this.user.password).then(
      (res) => {
        this.snackBar.open('Bem-Vindo!', 'Fechar', { duration: 3000 });
      },
      (err) => {
        this.snackBar.open(err.message, 'Fechar', { duration: 3000 });
      }
    );
  }

  isEmpty(): boolean {
    return this.user.userId == null || this.user.userId === '' ||
      this.user.passwordHash == null || this.user.passwordHash === '';
  }

  signInAnonymously() {
    this.authService.anonymousLogin()
      .then((res) => {
        },
        (err) => {
          this.snackBar.open(err.message, 'Fechar', {duration: 3000});
        });
  }
}
