import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  readonly EMAIL_PATTERN = /^\w+([\+\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;

  public user: any = {
    email: null,
    password: null
  };

  public errorMessage: string;
  public successMessage: string;
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  tryRegister() {
    if (this.registerForm.valid) {
      this.authService.signUp(this.user.email, this.user.password).then(
        (res) => {
          this.snackBar.open('Sua conta foi criada', 'Fechar', { duration: 3000 });
        },
        (err) => {
          this.snackBar.open(err.message, 'Fechar', { duration: 3000 });
        }
      );
    }
  }

  isEmpty(): boolean {
    return this.user.userId == null || this.user.userId === '' ||
      this.user.password == null || this.user.password === '';
  }
}
