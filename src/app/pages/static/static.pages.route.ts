import { Routes } from '@angular/router';
import { PageRouteInterceptor } from 'src/app/core';
import { AboutUsPageComponent } from './about.us.page.component';

export const staticPagesRoute: Routes = [
    {
        path: 'static/aboutus',
        component: AboutUsPageComponent,
        data: {
            authorities: ['ROLE_USER']
        },
        canActivate: [PageRouteInterceptor]
    }
  ];