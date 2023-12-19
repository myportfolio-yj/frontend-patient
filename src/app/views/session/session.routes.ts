import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const sessionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
      }
    ]
  }
];
