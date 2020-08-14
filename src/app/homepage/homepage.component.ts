import { Component, OnInit } from '@angular/core';
import { Alert } from '../services/alert/alert.model';
import { AlertFacade } from '../facades/AlertFacade';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(public alertFacade: AlertFacade) {}

  public alerts: Alert[];

  ngOnInit(): void {
    this.alerts = this.alertFacade.getAlerts();
  }
}
