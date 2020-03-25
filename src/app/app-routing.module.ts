import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { errorRoute } from './layout/error/error.route';

export const routes: Routes = [
  {
      path: '',
      component: MainComponent,
      children: [
        {
          path: '',
          redirectTo: '/pages/dashboard',
          pathMatch: 'full'
        },
        {
          path: 'pages',
          loadChildren: './pages/pages.module#PagesModule'
        },
        ...errorRoute
      ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
