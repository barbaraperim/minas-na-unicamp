import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
})
export class EmailConfirmationComponent implements OnInit {
  constructor(public authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  resendEmail() {
    this.authService.sendVerificationMail().then(
      (r) => {
        this.snackBar.open('Email enviado com sucesso', 'Fechar', { duration: 3000 });
      },
      (err) => {
        this.snackBar.open('Falha ao enviar email, tente novamente', 'Fechar', { duration: 3000 });
      }
    );
  }
}
