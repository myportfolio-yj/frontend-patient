import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { DetailAppointmentComponent } from './appointment/detail-appointment/detail-appointment.component';
import { AddPetComponent } from './pets/add-pet/add-pet.component';
import { DetailPetComponent } from './pets/detail-pet/detail-pet.component';

export const sessionRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      { path: 'my-account', component: MyAccountComponent},
      { path: 'add-appointment', component: AddAppointmentComponent},
      { path: 'detail-appointment', component: DetailAppointmentComponent},
      { path: 'add-pet', component: AddPetComponent},
      { path: 'detail-pet', component: DetailPetComponent}
    ],
  }
];
