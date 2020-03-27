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
  residenceData: IFeatures[] = null;

  testing = 0;
  pum = 0;
  pui = 0;

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
    this.getOnTesting();
    this.getPum();
    this.getPui();
    this.getMasterlist();
    this.getResidenceData();
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

  private getOnTesting() {
    this.service.getOnTesting().subscribe(
      (res: any) => {
        if (!res.body) { return; }
        this.testing = res.body.features[0].attributes.value;
      },
      (res: HttpErrorResponse) => {
        this.onError(res.message);
      }
    );
  }

  private getPum() {
    this.service.getPum().subscribe(
      (res: any) => {
        if (!res.body) { return; }
        this.pum = res.body.features[0].attributes.value;
      },
      (res: HttpErrorResponse) => {
        this.onError(res.message);
      }
    );
  }

  private getPui() {
    this.service.getPui().subscribe(
      (res: any) => {
        if (!res.body) { return; }
        this.pui = res.body.features[0].attributes.value;
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

  private getResidenceData() {
    this.service.getResidenceData().subscribe(
      (res: any) => {
        if (!res.body) { return; }
        this.residenceData = res.body.features;
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
