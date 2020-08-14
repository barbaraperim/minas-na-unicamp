import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AlertFirebaseService } from '../services/alert/alert.firebase.service';
import { placesData } from 'src/assets/data/places';
import * as Highcharts from 'highcharts';
import ExportingModule from 'highcharts/modules/exporting';
ExportingModule(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  map: google.maps.Map;
  lat = -22.817495;
  lng = -47.070928;

  markers = [];
  filter = {
    text: '',
    local: '',
    result: []
  };

  // Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 14
  };

  // Default Marker
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: 'Hello World!'
  });

  alerts = [];
  places:any[] = placesData;
  graphTimeList = [];
  timeCategories = ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h', '24h'];

  constructor(private alertFirebaseService: AlertFirebaseService) {}

  ngOnInit() {
    this.places.push('Todos os locais');
    this.alertFirebaseService.getAlerts().subscribe((alerts) => {
      
      const alertsData = alerts.map((alert) => alert.payload.doc.data());

      this.alerts = alertsData;      
      this.filter.result = alertsData;
      this.createGraphTimeList();
      this.createChart();

      alertsData.forEach(element => {
        this.markers.push({
          position: new google.maps.LatLng(element.lat, element.lng),
          map: this.map,
          title: element.local
        });
      });
      
      this.mapInitializer();      
    });
    
  }
  createChart(){
    Highcharts.chart({
      chart: {
          type: 'column',
          renderTo: 'container'
      },
      title: {
          text: 'Gráfico de ocorrências de horários nos alertas'
      },
      xAxis: {
          categories: this.timeCategories
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Número de alertas nos horários'
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: ( // theme
                      Highcharts.defaultOptions.title.style &&
                      Highcharts.defaultOptions.title.style.color
                  ) || 'gray'
              }
          }
      },
      legend: {
          align: 'right',
          x: -30,
          verticalAlign: 'top',
          y: 25,
          floating: true,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: 'Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
            color: '#673ab7',
              stacking: 'normal',
              dataLabels: {
                  enabled: true
              }
          }
      },
      series: [{
          name: 'Horários',
          type: 'column',
          data: this.graphTimeList
      }]
  });
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    // Adding Click event to default marker
    this.marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    // Adding other markers
    this.loadAllMarkers();
  }

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      // Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      // creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      // Add click event to open info window on marker
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap(), marker);
      });

      // Adding marker to google map
      marker.setMap(this.map);
    });
  }

  filterAlerts(){
    this.filter.result = this.alerts;
    if (this.filter.text.length > 0){
      this.filterByDescription();
    } else {
      this.filter.result = this.alerts;
    }
    if(this.filter.local.length > 0){
      this.filter.result = this.filter.result.filter((alert)=> alert.local === this.filter.local);
    }    
  }

  filterByDescription(){
    this.filter.result = this.alerts.filter((alert) => {
      if (alert.description.includes(this.filter.text)){
        return alert;
      }
    });
  }

  createGraphTimeList() {
    for (var i = 0; i < 24; i++){
      this.graphTimeList.push(0);
    }

    this.alerts.forEach(alert => {
      let time;
      if (alert.time.search('PM') != -1) {
        time = alert.time.replace('PM', '').replace(':', '.');
        time = parseInt(time) + 12;
        if (time === 24)
          time = 0;
      }

      if (alert.time.search('AM') != -1) {
        time = alert.time.replace('PM', '').replace(':', '.');
        time = parseInt(time);
      }
      
      this.graphTimeList[time]++;
    });


  }
}
