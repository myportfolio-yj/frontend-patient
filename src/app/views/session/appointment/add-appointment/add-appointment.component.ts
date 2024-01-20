import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TypographyAlign } from 'src/app/shared/components/typography/typography.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FormAppointmentResponse, ReservasPeluquero, ReservasVeterinario, TiposCita, Turno } from 'src/app/interfaces/form-appointment-response.interface';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  myForm!: FormGroup;
  
  headerColor: string = 'transparent'; // Inicialmente transparente
  formAppointmentData: FormAppointmentResponse = {} as FormAppointmentResponse;

  listVeterinario: ReservasVeterinario[] = [];
  listPeluquero: ReservasPeluquero[] = [];

  listDays:Turno[] = [];
  listTime: string[] = [];
  listTyAppointment: TiposCita[] = [];

  selectedTyAppointment: string | null = null;
  selectedVet: number | null = null;
  selectedDay: number | null = null;
  selectedTime: number | null = null;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService
  ) {
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

  ngOnInit(): void {
    this.getFormAppointment();
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

  selectVet(index: number): void {
    this.selectedVet = this.selectedVet === index ? null : index;
    this.listDays = this.listVeterinario[index].turnos;
    console.log(this.listDays);
  }

  selectDay(index: number): void {
    this.selectedDay = this.selectedDay === index ? null : index;
    this.listTime = this.listDays[index].turnos;
  }

  selectTime(index: number): void {
    this.selectedTime = this.selectedTime === index ? null : index;
  }

  selectTypeAppointment(id: string): void {
    this.selectedTyAppointment = this.selectedTyAppointment === id ? null : id;
    console.log(this.selectedTyAppointment)
    const reservas = this.listTyAppointment.find((b) => b.id === id);
    console.log(reservas);
    if(this.selectedTyAppointment === '6587bd5b28e28300c3fd3f54'){
      this.listVeterinario = [];
      if(reservas?.reservasVeterinario){
        this.listVeterinario = reservas?.reservasVeterinario;
        console.log(this.listVeterinario)
      }
    }else if(this.selectedTyAppointment === '6587bd8a28e28300c3fd3f55') {
      if(reservas?.reservasPeluquero){
        this.listPeluquero = reservas?.reservasPeluquero;
      }
    }
  }

  getFormAppointment(): void {
    this.appointmentService
      .getFormAppointment()
      .then((data) => {
        console.log(data);
        this.formAppointmentData = data;
        this.listTyAppointment = data.tiposCita
      }).catch(err => {
        console.log(err);
      });
  }

}
