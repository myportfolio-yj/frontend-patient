import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SessionRoutingModule } from './session.routing.module';
import { MyAccountComponent } from './my-account/my-account.component';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { DetailAppointmentComponent } from './appointment/detail-appointment/detail-appointment.component';
import { AddPetComponent } from './pets/add-pet/add-pet.component';
import { DetailPetComponent } from './pets/detail-pet/detail-pet.component';


@NgModule({
  declarations: [
    HomeComponent,
    MyAccountComponent,
    AddAppointmentComponent,
    DetailAppointmentComponent,
    AddPetComponent,
    DetailPetComponent
  ], imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SessionRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SessionModule { }
