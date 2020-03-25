import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PhDohSourceService } from 'src/app/shared/api/ph.doh.source.service';
import { IFeatures } from 'src/app/shared/models/ph.doh.ncov.model';

@Component({
  selector: 'ncov-dashboard-ph',
  templateUrl: './dashboard.ph.page.component.html',
  styleUrls: ['./dashboard.ph.page.component.scss']
})
export class DashboardPhPageComponent {

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
}
