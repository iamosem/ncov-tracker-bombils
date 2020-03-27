import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, TemplateRef } from '@angular/core';
import { ChartEvent, ChartType } from 'ng-chartist';
import { IFeatures } from 'src/app/shared/models/ph.doh.ncov.model';
import * as Chartist from 'chartist';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ParentComponent } from '../parent.component';

declare var require: any;
const data: any = require('./company.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'ncov-datasets-ph',
  templateUrl: './datasets.ph.component.html',
  providers: [DatePipe]
})
export class DatasetsPhComponent extends ParentComponent implements OnChanges {
  @ViewChild(DatasetsPhComponent) table: DatasetsPhComponent;

  @ViewChild('confirmedDate') public confirmedDateTemplate: TemplateRef<any>;
  @ViewChild('facility') public facilityTemplate: TemplateRef<any>;

  rows = [];
  temp = [...data];
  columns = [];

  @Input() masterlist: IFeatures[] = null;

  @Output() focusOnMarkerEmit = new EventEmitter<any>();

  filterOptions = [];
  selectedFilter = 'facility';

  constructor(
    private translateService: TranslateService,
    private datePipe: DatePipe
  ) {
    super();

    this.rows = data;
    this.temp = [...data];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('masterlist' in changes && this.masterlist) {
      this.initializeMasterlistColumns();
      this.initializeMasterlist();
    }
  }

  private initializeMasterlistColumns() {
    // tslint:disable:max-line-length
    this.filterOptions = [
      { prop: 'PH_masterl', name: this.translateService.instant('dashboard.datasets.columns.masterlist.codename') },
      { prop: 'edad', name: this.translateService.instant('dashboard.datasets.columns.masterlist.age') },
      { prop: 'kasarian', name: this.translateService.instant('dashboard.datasets.columns.masterlist.gender') },
      { prop: 'nationalit', name: this.translateService.instant('dashboard.datasets.columns.masterlist.nationality') },
      { prop: 'travel_hx', name: this.translateService.instant('dashboard.datasets.columns.masterlist.travelHistory') },
      { prop: 'facility', name: this.translateService.instant('dashboard.datasets.columns.masterlist.facility') }
    ];

    this.columns = [
      { prop: 'PH_masterl', name: this.translateService.instant('dashboard.datasets.columns.masterlist.codename'), resizeable: true, width: 100, frozenLeft: true },
      { prop: 'confirmed', name: this.translateService.instant('dashboard.datasets.columns.masterlist.confirmedDate'), cellTemplate: this.confirmedDateTemplate, resizeable: true, width: 150 },
      { prop: 'edad', name: this.translateService.instant('dashboard.datasets.columns.masterlist.age'), resizeable: true, width: 80 },
      { prop: 'kasarian', name: this.translateService.instant('dashboard.datasets.columns.masterlist.gender'), resizeable: true, width: 100 },
      { prop: 'nationalit', name: this.translateService.instant('dashboard.datasets.columns.masterlist.nationality'), resizeable: true, width: 150 },
      { prop: 'travel_hx', name: this.translateService.instant('dashboard.datasets.columns.masterlist.travelHistory'), resizeable: true, width: 200 },
      { prop: 'facility', name: this.translateService.instant('dashboard.datasets.columns.masterlist.facility'), cellTemplate: this.facilityTemplate, resizeable: true, width: 500 },
    ];
    // tslint:enable:max-line-length
  }

  private initializeMasterlist() {
    const master = this.masterlist.map(m => {
      return {
        PH_masterl: m.attributes.PH_masterl,
        confirmed: m.attributes.confirmed,
        edad: m.attributes.edad,
        kasarian: m.attributes.kasarian,
        nationalit: m.attributes.nationalit,
        travel_hx: m.attributes.travel_hx,
        facility: m.attributes.facility,
        lng: m.attributes.longitude,
        lat: m.attributes.latitude
      };
    });

    this.rows = [...master];
    this.temp = [...master];
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter((d) => {
      return d[this.selectedFilter].toString().toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table = data;
  }

  public dateTransform(value) {
    const parsedDate = Date.parse(value);
    if (isNaN(parsedDate)) {
      if (!value || value.trim() === '') {
        value = '-';
      }
      return value;
    }
    return this.datePipe.transform(value, 'MMM d, y');
  }

  public focusOnMarker(row: any) {
    this.focusOnMarkerEmit.emit({ lng: row.lng, lat: row.lat });
    this.scrollViewToPanelEmit.emit('map');
  }
}
