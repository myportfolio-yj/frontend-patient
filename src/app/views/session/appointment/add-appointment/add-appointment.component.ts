import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { TypographyAlign } from 'src/app/shared/components/typography/typography.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option } from './../../../../shared/components/select/option.interface';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent {

  myForm!: FormGroup;

  listSex: Option[] = [];
  listSpecies: Option[] = [];
  listBreed: Option[] = [];
  listAllergies: Option[] = [];
  listVaccines: Option[] = [];
  
  allergiesSelected: string[] = [];
  vaccinesSelected: string[] = [];

  constructor(
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.allergiesSelected = [];
    this.vaccinesSelected = [];
    this.myForm = this.formBuilder.group({
      mascota: ['', Validators.required],
      tipoCita: ['', Validators.required],
      fecha: ['', Validators.required],
      turno: ['', Validators.required],
      baño: [false],
      corte: [false],
      observaciones: ['']
    });
  }

  get TypographyAlign(): typeof TypographyAlign {
    return TypographyAlign
  }

  goBack(): void {
    this.location.back();
  }

  addPet() {
    if (this.myForm.valid) {
      // Realizar el registro si el formulario es válido
      const formData = this.myForm.value;
      //this.postAddPetById(formData);
      console.log(formData);
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos requeridos.');
    }
  }

  clearForm(): void {
    this.myForm.reset();
  }

  changeSexo(event: any): void {
    const nombresControl = this.myForm.get('idSexo');
    if (nombresControl) {
      nombresControl.setValue(event.value);
    } else {
      console.error('Control "nombres" no encontrado en el formulario.');
    }
  }

  changeEspecie(event: any): void {
    const nombresControl = this.myForm.get('idEspecie');
    if (nombresControl) {
      nombresControl.setValue(event.value);
      //this.onSpeciesChange(event.name);
    } else {
      console.error('Control "nombres" no encontrado en el formulario.');
    }
  }

  changeRaza(event: any): void {
    const nombresControl = this.myForm.get('idRaza');
    if (nombresControl) {
      nombresControl.setValue(event.value);
    } else {
      console.error('Control "nombres" no encontrado en el formulario.');
    }
  }

}
