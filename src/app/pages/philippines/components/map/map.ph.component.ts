import { Component, OnChanges, SimpleChanges, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet';
import { IFeatures } from 'src/app/shared/models/ph.doh.ncov.model';
import {
  MAPS_TILE_LAYER_OPENSTREETMAP_URL,
  MAPS_TILE_LAYER_OPENSTREETMAP_ATTR,
  MAPS_PH_CENTER_COOR,
  MAPS_PH_MIN_ZOOM_LEVEL,
  MAPS_PH_FOCUS_ZOOM_LEVEL
} from 'src/app/app.constants';
import { DatePipe } from '@angular/common';
import { ParentComponent } from '../parent.component';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/images/blue-marker-2x.png',
  iconUrl: 'assets/images/blue-marker.png',
  shadowUrl: 'assets/images/marker-shadow.png',
});

@Component({
  selector: 'ncov-map-ph',
  templateUrl: './map.ph.component.html',
  styleUrls: ['./map.ph.component.scss'],
  providers: [DatePipe]
})
export class MapPhComponent extends ParentComponent implements OnChanges, AfterViewInit {

  @Input() mapData: IFeatures[] = null;
  @Input() focusMarker = null;

  map = null;

  private maleIcon = new L.Icon.Default({
    iconRetinaUrl: 'assets/images/blue-marker-2x.png',
    iconUrl: 'assets/images/blue-marker.png'
  });

  private femaleIcon = new L.Icon.Default({
    iconRetinaUrl: 'assets/images/red-marker-2x.png',
    iconUrl: 'assets/images/red-marker.png'
  });

  summaryDate = null;

  constructor(
    private translateService: TranslateService,
    private datePipe: DatePipe
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('focusMarker' in changes && this.focusMarker) {
      this.centerOnMarker(this.focusMarker);
    }

    if ('mapData' in changes && this.mapData) {
      this.plotMapData();
      this.getSummaryDate();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap());
  }

  initMap(): void {
    this.map = L.map('map', { center: MAPS_PH_CENTER_COOR, zoom: MAPS_PH_MIN_ZOOM_LEVEL, minZoom: MAPS_PH_MIN_ZOOM_LEVEL });
    L.tileLayer(MAPS_TILE_LAYER_OPENSTREETMAP_URL, { maxZoom: 19, attribution: MAPS_TILE_LAYER_OPENSTREETMAP_ATTR }).addTo(this.map);
  }

  private plotMapData() {
    const markers = this.mapData.map(d => d.attributes);
    for (const marker of markers) {
      this.addMarker(marker);
    }
  }

  private getSummaryDate() {
    const latest = this.mapData[this.mapData.length - 1];
    this.summaryDate = latest.attributes.date;
  }

  private addMarker(data: any) {
    const marker = L.marker([data.latitude, data.longitude],
      { icon: data.kasarian.toString().toLowerCase() === 'female' ? this.femaleIcon : this.maleIcon });
    marker.addTo(this.map);
    marker.bindPopup(`
    <div style="width: 300px;">
      <div class="row mb-2">
        <div class="col-7">
          <small class="text-muted">${ this.translateService.instant('dashboard.datasets.columns.masterlist.codename')}</small>
          <h6>${ data.PH_masterl}</h6>
        </div>
        <div class="col-5">
          <small class="text-muted">${ this.translateService.instant('dashboard.datasets.columns.masterlist.confirmedDate')}</small>
          <h6>${ this.dateTransform(data.confirmed)}</h6>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-3">
          <small class="text-muted p-t-5">${ this.translateService.instant('dashboard.datasets.columns.masterlist.age')}</small>
          <h6>${ data.edad}</h6>
        </div>
        <div class="col-4">
          <small class="text-muted p-t-5">${ this.translateService.instant('dashboard.datasets.columns.masterlist.gender')}</small>
          <h6>${ this.formatIfEmpty(data.kasarian)}</h6>
        </div>
        <div class="col-5">
          <small class="text-muted p-t-5">${ this.translateService.instant('dashboard.datasets.columns.masterlist.nationality')}</small>
          <h6>${ this.formatIfEmpty(data.nationalit)}</h6>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-12">
          <small class="text-muted p-t-5">${ this.translateService.instant('dashboard.datasets.columns.masterlist.residence')}</small>
          <h6>${ this.formatIfEmpty(data.residence)}</h6>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-12">
          <small class="text-muted p-t-5">${ this.translateService.instant('dashboard.datasets.columns.masterlist.travelHistory')}</small>
          <h6>${ this.formatIfEmpty(data.travel_hx)}</h6>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-12">
          <small class="text-muted p-t-5">${ this.translateService.instant('dashboard.datasets.columns.masterlist.facility')}</small>
          <h6>${ this.formatIfEmpty(data.facility)}</h6>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-6">
          <small class="text-muted p-t-5">${ this.translateService.instant('dashboard.datasets.columns.masterlist.symptoms')}</small>
          <h6>${ this.formatIfEmpty(data.symptoms)}</h6>
        </div>
        <div class="col-6">
          <small class="text-muted p-t-5">${ this.translateService.instant('dashboard.datasets.columns.masterlist.status')}</small>
          <h6>${ this.formatIfEmpty(data.status)}</h6>
        </div>
      </div>
    </div>
    `);
  }

  public dateTransform(value: string) {
    const parsedDate = Date.parse(value);
    if (isNaN(parsedDate)) {
      if (!value || value.trim() === '') {
        value = '-';
      }
      return value;
    }
    return this.datePipe.transform(value, 'MMM d, y');
  }

  public formatIfEmpty(value: string) {
    if (null === value || undefined === value || value.trim() === '') {
      return '-';
    } else {
      return value;
    }
  }

  public centerOnMarker(lnglat) {
    const markerBounds = L.latLngBounds([lnglat]);
    this.map.fitBounds(markerBounds);

    this.map.setView(lnglat, MAPS_PH_FOCUS_ZOOM_LEVEL);
  }

  public recenterMap() {
    this.map.setView(MAPS_PH_CENTER_COOR, MAPS_PH_MIN_ZOOM_LEVEL);
  }

}
