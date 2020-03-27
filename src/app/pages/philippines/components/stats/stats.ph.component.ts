import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ChartEvent, ChartType } from 'ng-chartist';
import { IFeatures } from 'src/app/shared/models/ph.doh.ncov.model';
import * as Chartist from 'chartist';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { ParentComponent } from '../parent.component';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'ncov-stats-ph',
  templateUrl: './stats.ph.component.html'
})
export class StatsPhComponent extends ParentComponent implements OnChanges {

  lineChartData: Array<any> = [];
  lineChartLabels: Array<any> = [];

  lineChartOptions: any = {
    scales: {
      yAxes: [
        {
          ticks: { beginAtZero: true },
          gridLines: { color: 'rgba(120, 130, 140, 0.13)' }
        }
      ],
      xAxes: [
        {
          gridLines: { color: 'rgba(120, 130, 140, 0.13)' }
        }
      ]
    },
    lineTension: 10,
    responsive: true,
    maintainAspectRatio: false
  };

  lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(38,218,210,0.0)',
      borderColor: '#ffb22b',
      pointBackgroundColor: '#ffb22b',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(38,218,210,0.5)'
    },
    {
      backgroundColor: 'rgba(38,218,210,0.0)',
      borderColor: '#ef5350',
      pointBackgroundColor: '#ef5350',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(38,218,210,0.5)'
    },
    {
      backgroundColor: 'rgba(25,118,210,0.0)',
      borderColor: '#26dad2',
      pointBackgroundColor: '#26dad2',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(25,118,210,0.5)'
    }
  ];
  lineChartLegend = false;
  lineChartType = 'line';

  statisticsDaysOptions = [];
  statisticsDays = 7;
  statisticsMinDays = 7;

  statusChart: Chart = {
    type: 'Pie',
    data: { series: [] },
    options: { donut: true, showLabel: false, donutWidth: 40 }
  };

  admitted = 0;
  deaths = 0;
  recovered = 0;

  @Input() summaryData: IFeatures[] = null;

  constructor(private translateService: TranslateService) {
    super();
    this.statusChart.data.series = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('summaryData' in changes && this.summaryData) {
      this.initializeStatusChart();
      this.initializeStatisticsChart();
    }
  }

  private initializeStatusChart() {
    setTimeout(() => {
      const latest = this.summaryData[this.summaryData.length - 1];

      this.admitted = latest.attributes.admitted;
      this.deaths = latest.attributes.deaths;
      this.recovered = latest.attributes.recovered;

      this.statusChart.data.series = [
        {
          value: this.admitted,
          className: 'stroke-warning'
        },
        {
          value: this.recovered,
          className: 'stroke-success'
        },
        {
          value: this.deaths,
          className: 'stroke-danger'
        }];
    });
  }

  public initializeStatisticsChart() {
    this.lineChartData = [];

    this.statisticsDaysOptions = Array.apply(null, {length: (this.summaryData.length - this.statisticsMinDays) + 1})
      .map(Number.call, Number).map(x => x + this.statisticsMinDays);

    setTimeout(() => {
      const startIndex = this.summaryData.length < this.statisticsDays ? 0 : this.summaryData.length - this.statisticsDays;

      const slicedData = this.summaryData.slice(startIndex);

      this.lineChartLabels = slicedData.map(d => moment(d.attributes.date).format('MMM Do'));
      this.lineChartData = [
        {
          data: [ ...slicedData.map(d => d.attributes.admitted) ],
          label: this.translateService.instant('dashboard.statistics.admitted')
        },
        {
          data: [ ...slicedData.map(d => d.attributes.deaths) ],
          label: this.translateService.instant('dashboard.statistics.deaths')
        },
        {
          data: [ ...slicedData.map(d => d.attributes.recovered) ],
          label: this.translateService.instant('dashboard.statistics.recovered')
        }
      ];
    });
  }
}
