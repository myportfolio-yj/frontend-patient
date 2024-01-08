import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent {

  constructor(
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

}
