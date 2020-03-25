import { PageRouteInterceptor } from 'src/app/core';
import { DashboardPageComponent } from './dashboard.page.component';
import { Routes } from '@angular/router';

export const dashboardRoute: Routes = [
  {
      path: 'dashboard',
      component: DashboardPageComponent,
      data: {
          authorities: ['ROLE_USER']
      },
      canActivate: [PageRouteInterceptor]
  }
];
