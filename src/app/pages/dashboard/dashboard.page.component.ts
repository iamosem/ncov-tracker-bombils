import { Component } from '@angular/core';
import * as moment from 'moment';
import * as Chartist from 'chartist';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { ChartEvent, ChartType } from 'ng-chartist';
import { HerokuSourceService } from 'src/app/shared/api/heroku.source.service';
import { IHerokuNcov } from 'src/app/shared/models/heroku.ncov.model';
import { HEROKU_NCOV_DATA_CACHENAME } from 'src/app/app.constants';
import { HttpErrorResponse } from '@angular/common/http';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'ncov-dashboard',
  templateUrl: './dashboard.page.component.html',
  styleUrls: ['./dashboard.page.component.scss']
})
export class DashboardPageComponent {
  settings2 = tableData.settings;
  source: LocalDataSource;
  subtitle: string;

  // This is for the dashboar line chart
  // lineChart
  public lineChartData: Array<any> = [
    { data: [50, 130, 80, 70, 180, 105, 250], label: 'Confirmed' },
    { data: [80, 100, 60, 200, 150, 100, 150], label: 'Deaths' },
    { data: [23, 34, 56, 67, 87, 97, 67], label: 'Recovered' }
  ];

  public lineChartLabels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];

  public lineChartOptions: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'rgba(120, 130, 140, 0.13)'
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: 'rgba(120, 130, 140, 0.13)'
          }
        }
      ]
    },
    lineTension: 10,
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartColors: Array<any> = [
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
  public lineChartLegend = false;
  public lineChartType = 'line';

  statusChart: Chart = {
    type: 'Pie',
    data: {
      series: []
    },
    options: {
      donut: true,
      showLabel: false,
      donutWidth: 40
    }
  };

  confirmed = 0;
  deaths = 0;
  recovered = 0;

  data: IHerokuNcov = null;

  constructor(private service: HerokuSourceService) {
    this.subtitle = 'This is some text within a card block.';
    this.source = new LocalDataSource(tableData.data);

    this.statusChart.data.series = null;

    this.data = this.getHerokuNcovDataCache();
    if (!this.data) {
      service.getAllLocations(1).subscribe(
        (latest: any) => {
          if (!latest.body) {
            return;
          }
          this.data = latest.body;
          this.saveHerokuNcovDataCache();
          this.parseLatestValues();
        }, (res: HttpErrorResponse) => {
          this.onError(res.message);
        }
      );
    } else {
      this.parseLatestValues();
    }
  }

  private parseLatestValues() {
    setTimeout(() => {
      this.confirmed = this.data.latest.confirmed;
      this.deaths = this.data.latest.deaths;
      this.recovered = this.data.latest.recovered;

      this.statusChart.data.series = [
        {
          value: this.confirmed,
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
    }, 1);
  }

  private onError(errorMessage: string) {
    console.log('@@@ ERROR: ' + errorMessage);
  }

  private saveHerokuNcovDataCache() {
    const cacheData = { ...this.data, timestamp: moment.utc() };
    localStorage.setItem(HEROKU_NCOV_DATA_CACHENAME, JSON.stringify(cacheData));
  }

  private getHerokuNcovDataCache() {
    const cache = localStorage.getItem(HEROKU_NCOV_DATA_CACHENAME);
    const now = moment.utc();
    if (cache) {
      const parsed = JSON.parse(cache);
      const timestamp = parsed.timestamp;
      if (moment.duration(now.diff(moment.utc(timestamp))).asDays() > 1) {
        localStorage.removeItem('');
        return null;
      }
      return parsed;
    }
    return null;
  }
}
