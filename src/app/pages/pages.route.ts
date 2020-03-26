import { Routes } from '@angular/router';
import { PageRouteInterceptor } from '../core';
import { dashboardRoute } from './dashboard/dashboard.route';
import { dashboardPhRoute } from './philippines/dashboard.ph.route';
import { staticPagesRoute } from './static/static.pages.route';

const PAGE_ROUTES = [
  ...dashboardRoute,
  ...dashboardPhRoute,
  ...staticPagesRoute
];

export const pageState: Routes = [
  {
      path: '',
      data: {
          authorities: ['ROLE_USER']
      },
      canActivate: [PageRouteInterceptor],
      children: PAGE_ROUTES
  }
];
