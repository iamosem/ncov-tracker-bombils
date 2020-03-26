import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { PhDohSourceService } from 'src/app/shared/api/ph.doh.source.service';
import { IFeatures } from 'src/app/shared/models/ph.doh.ncov.model';

@Component({
  selector: 'ncov-dashboard-ph',
  templateUrl: './dashboard.ph.page.component.html',
  styleUrls: ['./dashboard.ph.page.component.scss']
})
export class DashboardPhPageComponent {

  @ViewChild('summary') summary: ElementRef;
  @ViewChild('stats') stats: ElementRef;
  @ViewChild('map') map: ElementRef;
  @ViewChild('datasets') datasets: ElementRef;

  confirmedData: IFeatures[] = null;
  summaryData: IFeatures[] = null;
  masterlist: IFeatures[] = null;

  focusMarker = null;

  constructor(private service: PhDohSourceService) {
    this.updateAll();
  }

  public focusOnMarker(lnglat: any) {
    this.focusMarker = lnglat;
  }

  public updateAll() {
    this.getConfirmed();
    this.getSummary();
    this.getMasterlist();
  }

  private getConfirmed() {
    this.service.getConfirmed().subscribe(
      (res: any) => {
        if (!res.body) { return; }
        this.confirmedData = res.body.features;
      },
      (res: HttpErrorResponse) => {
        this.onError(res.message);
      }
    );
  }

  private getSummary() {
    this.service.getSummary().subscribe(
      (res: any) => {
        if (!res.body) { return; }
        this.summaryData = res.body.features;
      },
      (res: HttpErrorResponse) => {
        this.onError(res.message);
      }
    );
  }

  private getMasterlist() {
    this.service.getMasterlist().subscribe(
      (res: any) => {
        if (!res.body) { return; }
        this.masterlist = res.body.features;
      },
      (res: HttpErrorResponse) => {
        this.onError(res.message);
      }
    );
  }

  private onError(errorMessage: string) {
    console.log('@@@ ERROR: ' + errorMessage);
  }

  public scrollViewToPanel(panelName: string) {
    switch (panelName.toLowerCase()) {
      case 'summary':
        this.summary.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'stats':
        this.stats.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'map':
        this.map.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'datasets':
        this.datasets.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
    }
  }
}
