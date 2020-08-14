import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public email: string;
  public form: FormGroup;

  constructor(public authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required])
    });
  }

  forgotPassword(): void {
    this.authService.forgotPassword(this.email).then(
      () => {
        this.snackBar.open('Email enviado com sucesso!', 'Fechar', {duration: 3000});
      },
      (err) => {
        console.log(err);
        this.snackBar.open(err.message, 'Fechar', {duration: 3000});
      }
    );
  }

}
