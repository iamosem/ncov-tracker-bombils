import { PageRouteInterceptor } from 'src/app/core';
import { DashboardPhPageComponent } from './dashboard.ph.page.component';
import { Routes } from '@angular/router';

export const dashboardPhRoute: Routes = [
  {
      path: 'dashboard/ph',
      component: DashboardPhPageComponent,
      data: {
          authorities: ['ROLE_USER']
      },
      canActivate: [PageRouteInterceptor]
  }
];
