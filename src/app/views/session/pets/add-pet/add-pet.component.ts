import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent {

  constructor(
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

}
