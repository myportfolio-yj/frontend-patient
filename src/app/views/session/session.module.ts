import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SessionRoutingModule } from './session.routing.module';


@NgModule({
  declarations: [
    HomeComponent,
  ], imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    SessionRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SessionModule { }
