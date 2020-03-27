import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IFeatures } from 'src/app/shared/models/ph.doh.ncov.model';
import { ParentComponent } from '../parent.component';

@Component({
  selector: 'ncov-summary-ph',
  templateUrl: './summary.ph.component.html'
})
export class SummaryPhComponent extends ParentComponent implements OnChanges {
  confirmed = 0;
  admitted = 0;
  deaths = 0;
  recovered = 0;

  admittedDiff = 0;
  deathsDiff = 0;
  recoveredDiff = 0;

  summaryDateStart = 0;
  summaryDateEnd = 0;

  @Input() confirmedData: IFeatures[] = null;
  @Input() summaryData: IFeatures[] = null;
  @Input() testing = 0;
  @Input() pum = 0;
  @Input() pui = 0;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('confirmedData' in changes && this.confirmedData) {
      this.parseConfirmedValue();
    }

    if ('summaryData' in changes && this.summaryData) {
      this.parseLatestValues();
      this.initalizeSparklines();
    }
  }

  private parseConfirmedValue() {
    this.confirmed = this.confirmedData[0].attributes.value;
  }

  private parseLatestValues() {
    const latest = this.summaryData[this.summaryData.length - 1];

    this.summaryDateEnd = latest.attributes.date;
    this.admitted = latest.attributes.admitted;
    this.deaths = latest.attributes.deaths;
    this.recovered = latest.attributes.recovered;
  }

  private initalizeSparklines() {
    const startIndex = this.summaryData.length < 10 ? 0 : this.summaryData.length - 10;

    this.summaryDateStart = this.summaryData[startIndex].attributes.date;

    this.admittedDiff = this.initalizeSparklineContainer(
      'admittedSparkline', 'ffb22b', this.summaryData.slice(startIndex).map(d => d.attributes.admitted)
    );

    this.deathsDiff = this.initalizeSparklineContainer(
      'deathsSparkline', 'ef5350', this.summaryData.slice(startIndex).map(d => d.attributes.deaths)
    );

    this.recoveredDiff = this.initalizeSparklineContainer(
      'recoveredSparkline', '26dad2', this.summaryData.slice(startIndex).map(d => d.attributes.recovered)
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
}
