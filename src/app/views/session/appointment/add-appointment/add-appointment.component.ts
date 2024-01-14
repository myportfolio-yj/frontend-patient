import { Component, HostListener } from '@angular/core';
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
  headerColor: string = 'transparent'; // Inicialmente transparente

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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Cambia el color del fondo del header cuando la posición de desplazamiento sea mayor a cierta cantidad
    if (scrollPosition > 100) {
      //this.headerColor = 'var(--color-primary)'; // Nuevo color cuando se desplaza hacia abajo
      this.headerColor = 'transparent';
    } else {
      this.headerColor = 'transparent'; // Color inicial cuando está en la parte superior
    }
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

  listDay: any[] = Array.from({ length: 10 }, (_, index) => index + 1);
  selectedDay: number | null = null;

  listDays: any = [
    {
      id: '1',
      diaName: 'Lunes',
      diaNumber: '01',
      fecha: '01/02/2024'
    },
    {
      id: '2',
      diaName: 'Martes',
      diaNumber: '02',
      fecha: '02/02/2024'
    },
    {
      id: '3',
      diaName: 'Miercoles',
      diaNumber: '03',
      fecha: '03/02/2024'
    },
    {
      id: '4',
      diaName: 'Jueves',
      diaNumber: '04',
      fecha: '04/02/2024'
    },
    {
      id: '5',
      diaName: 'Viernes',
      diaNumber: '05',
      fecha: '05/02/2024'
    },
    {
      id: '6',
      diaName: 'Sábado',
      diaNumber: '06',
      fecha: '06/02/2024'
    },
    {
      id: '7',
      diaName: 'Domingo',
      diaNumber: '07',
      fecha: '07/02/2024'
    }
  ];

  listTime: any[] = Array.from({ length: 20 }, (_, index) => index + 1);
  selectedTime: number | null = null;

  listTyAppointment: any[] = Array.from({ length: 2 }, (_, index) => index + 1);
  selectedTyAppointment: number | null = null;

  selectDay(index: number): void {
    this.selectedDay = this.selectedDay === index ? null : index;
  }

  selectTime(index: number): void {
    this.selectedTime = this.selectedTime === index ? null : index;
  }

  selectTypeAppointment(index: number): void {
    this.selectedTyAppointment = this.selectedTyAppointment === index ? null : index;
  }

}
