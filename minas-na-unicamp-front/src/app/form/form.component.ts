import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertFirebaseService } from '../services/alert/alert.firebase.service';
import { placesData } from 'src/assets/data/places';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  alertForm: FormGroup = new FormGroup({
    time: new FormControl('', [Validators.required]),
    local: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    user: new FormControl(''),
    alertType: new FormControl(''),
  });;

  places: any[] = placesData;
  error: boolean;
  success: boolean;

  constructor(private fb: FormBuilder, 
    private alertFirebaseService: AlertFirebaseService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {    
    this.createForm();
  }

  submitAlert() {
    const submit_alert = {
      ...this.alertForm.value,
      lat: this.alertForm.value.local.lat,
      lng: this.alertForm.value.local.lng,
      local: this.alertForm.value.local.name,
    };    

    this.alertFirebaseService
      .createAlert(submit_alert)
      .then(() => {
        this.success = true;
        this.snackBar.open('Seu alerta foi enviado!', 'Fechar', { duration: 3000 });
      })
      .catch((err) => {
        this.error = true;
        this.snackBar.open(err.message, 'Fechar', { duration: 3000 });
      });

    this.createForm();
  }

  createForm() {
    this.alertForm = this.fb.group({
      time: '',
      local: '',
      description: '',
      user: 'anon',
      alertType: 'alerta',
    });
  }
}
