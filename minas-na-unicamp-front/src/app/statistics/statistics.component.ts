import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import ExportingModule from 'highcharts/modules/exporting';
ExportingModule(Highcharts);
import { FormFirebaseService } from '../services/form/form.firebase.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor(private formService: FormFirebaseService) {}

  ngOnInit(): void {
    this.getData();
    this.createChart();
  }

  getData() {
    this.formService.getForms().subscribe((r) => {});
  }

  // TO-DO: Reorganizar dados do gráfico com os dados novos
  createChart(){
    Highcharts.chart({
      chart: {
        renderTo: 'chart',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Gênero'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
  
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Porcentagem:',
        colorByPoint: true,
        type: undefined,
        data: [{
          name: 'Mulher',
          y: 85.714286,
          sliced: true,
          selected: true
        }, {
          name: 'Homem',
          y: 12.987013
        }, {
          name: 'Outros',
          y: 0.649351
        }, {
          name: 'Não Binárie',
          y: 0.649351
        }]
      }]
    });
  Highcharts.chart({
    chart: {
      renderTo: 'chart2',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Vinculo'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Porcentagem:',
      colorByPoint: true,
      type: undefined,
      data: [{
        name: 'Alune',
        y:  93.506494,
        sliced: true,
        selected: true
      }, {
        name: 'Sem Vinculo',
        y:  3.896104
      }, {
        name: 'Funcionárie',
        y:  1.298701
      }, {
        name: 'Professore',
        y: 1.298701
      }]
    }]
  });
  Highcharts.chart({
    chart: {
      renderTo: 'chart3',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Você se sente segure no Campus?'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Porcentagem:',
      colorByPoint: true,
      type: undefined,
      data: [{
        name: 'Não',
        y:  45.454545,
        sliced: true,
        selected: true
      }, {
        name: 'Sim',
        y:  35.064935
      }, {
        name: 'Depende (horário, lugar e/ou companhia)',
        y: 19.48052
      }]
    }]
  });
}

}
