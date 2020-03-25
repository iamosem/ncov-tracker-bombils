import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IHerokuNcov, IHNCLocations } from 'src/app/shared/models/heroku.ncov.model';
import * as moment from 'moment';

@Component({
  selector: 'ncov-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnChanges {
  latest: IHerokuNcov;

  confirmed = 0;
  deaths = 0;
  recovered = 0;

  confirmedCount: number[];
  deathsCount: number[];
  recoveredCount: number[];

  confirmedDiff = 0;
  deathsDiff = 0;
  recoveredDiff = 0;

  @Input() data: IHerokuNcov = null;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes && this.data) {
      this.parseLatestValues();
      this.initalizeSparklines();
    }
  }

  private parseLatestValues() {
    this.confirmed = this.data.latest.confirmed;
    this.deaths = this.data.latest.deaths;
    this.recovered = this.data.latest.recovered;
  }

  private initalizeSparklines() {
    this.confirmedDiff = this.initalizeSparklineContainer(
      'confirmedSparkline', 'ffb22b', this.extractAndSummarizeTimelines(this.data.locations, 'confirmed')
    );

    this.deathsDiff = this.initalizeSparklineContainer(
      'deathsSparkline', 'ef5350', this.extractAndSummarizeTimelines(this.data.locations, 'deaths')
    );

    this.recoveredDiff = this.initalizeSparklineContainer(
      'recoveredSparkline', '26dad2', this.extractAndSummarizeTimelines(this.data.locations, 'recovered')
    );
  }

  private initalizeSparklineContainer(container: string, color: string, values: any) {
    const results = [];
    for (let i = 1; i < values.length; i++) {
      results.push(values[i] - values[i - 1]);
    }
    ($(`#${container}`) as any).sparkline(results, {
      type: 'bar',
      height: '50',
      barWidth: '6',
      resize: true,
      barSpacing: '6',
      barColor: `#${color}`
    });
    return results[results.length - 1] - results[results.length - 2];
  }

  private extractAndSummarizeTimelines(data: IHNCLocations[], type: string) {
    const now = moment.utc();
    const summary = {};
    data.forEach(location => {
      const timelines = location.timelines[type].timeline;
      Object.keys(timelines).filter(t => moment.duration(now.diff(moment.utc(t))).asDays() <= 10).forEach(k => {
        if (k in summary) {
          summary[k] += timelines[k];
        } else {
          summary[k] = timelines[k];
        }
      });
    });

    return Object.values(summary);
  }
}
