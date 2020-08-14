import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { InformacoesComponent } from './informacoes/informacoes.component';
import { RegisterComponent } from './register/register.component';
import { FormComponent } from './form/form.component';
import {LoginComponent} from './login/login.component';
import {EmailConfirmationComponent} from './email-confirmation/email-confirmation.component';
import {AuthGuard} from './guards/auth.guard';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'estatisticas',
    component: StatisticsComponent,
  },
  {
    path: 'informacoes',
    component: InformacoesComponent,
  },
  {
    path: 'formulario',
    component: FormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'confirmacao-email',
    component: EmailConfirmationComponent
  },
  {
    path: 'esqueci-senha',
    component: ForgotPasswordComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
