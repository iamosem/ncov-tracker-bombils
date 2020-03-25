import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../shared/shared.module';
import { SummaryComponent } from './dashboard/components/summary/summary.component';
import { DashboardPageComponent } from './dashboard/dashboard.page.component';
import { pageState } from './pages.route';
import { DatasetsPhComponent } from './philippines/components/datasets/datasets.ph.component';
import { StatsPhComponent } from './philippines/components/stats/stats.ph.component';
import { SummaryPhComponent } from './philippines/components/summary/summary.ph.component';
import { DashboardPhPageComponent } from './philippines/dashboard.ph.page.component';
import { MapPhComponent } from './philippines/components/map/map.ph.component';

@NgModule({
  imports: [
    RouterModule.forChild(pageState),
    SharedModule,
    CommonModule,
    ChartsModule,
    ChartistModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    SummaryComponent,
    DashboardPageComponent,
    SummaryPhComponent,
    StatsPhComponent,
    DatasetsPhComponent,
    MapPhComponent,
    DashboardPhPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
