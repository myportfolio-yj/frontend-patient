import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from './my-account/my-account.component';

export const sessionRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'my-account', component: MyAccountComponent}
    ],
  }
];
