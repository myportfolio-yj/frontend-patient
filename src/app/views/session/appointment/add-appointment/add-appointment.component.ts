import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TypographyAlign } from 'src/app/shared/components/typography/typography.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AtencionesPeluqueria, FormAppointmentResponse, Mascota, ReservasPeluquero, ReservasVeterinario, TiposCita, Turno } from 'src/app/interfaces/form-appointment-response.interface';
import { LOCAL_STORAGE } from 'src/app/utils/constants';
import { AddAppointmentRequest } from 'src/app/interfaces/add-appointment-request.interface';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  myForm!: FormGroup;

  headerColor: string = 'transparent'; // Inicialmente transparente
  formAppointmentData: FormAppointmentResponse = {} as FormAppointmentResponse;

  idClient = '';
  listVeterinario: ReservasVeterinario[] = [];
  listPeluquero: ReservasPeluquero[] = [];

  listPets: Mascota[] = [];
  listDays: Turno[] = [];
  listTime: string[] = [];
  listTyAppointment: TiposCita[] = [];
  listAttentionPelu: AtencionesPeluqueria[] = [];
  listAttentionForm: string[] = [];

  selectedPet: number | null = null;
  selectedTyAppointment: string | null = null;
  selectedVet: number | null = null;
  selectedPelu: number | null = null;
  selectedDay: number | null = null;
  selectedTime: number | null = null;

  isVet = true;
  titleEmploye = 'Seleccione su tipo de cita'

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService
  ) {
    this.myForm = this.formBuilder.group({
      idCliente: ['', Validators.required],
      idMascota: ['', Validators.required],
      idTipoCita: ['', Validators.required],
      fecha: ['', Validators.required],
      turno: ['', Validators.required],
      observaciones: [''],
      atencionesPeluqueria: [this.listAttentionForm]
    });

    this.idClient = localStorage.getItem(LOCAL_STORAGE.USER) || '';
  }

  ngOnInit(): void {
    this.getFormAppointmentByClient(this.idClient);
    this.validateAndSetControlValue('idCliente', this.idClient, this.myForm);
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

  addAppointment() {
    if (this.myForm.valid) {
      // Realizar el registro si el formulario es válido
      const formData = this.myForm.value;
      this.postAddAppointmentById(formData);
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos requeridos.');
    }
  }

  clearForm(): void {
    this.myForm.reset();
  }

  selectPet(index: number, petId: string): void {
    //this.selectedPet = this.selectedPet === index ? null : index;
    this.selectedPet = index;
    this.validateAndSetControlValue('idMascota', petId, this.myForm);
  }

  selectTypeAppointment(id: string): void {
    this.selectedTyAppointment = id;
    const reservas = this.listTyAppointment.find((b) => b.id === id);
    console.log(reservas);
    this.cleanSelectAppointment();
    this.validateAndSetControlValue('idTipoCita', id, this.myForm);
    if (this.selectedTyAppointment === '6587bd5b28e28300c3fd3f54') {
      this.isVet = true;
      this.titleEmploye = 'Veterinarios disponibles'
      if (reservas?.reservasVeterinario) {
        this.listVeterinario = reservas?.reservasVeterinario;
      }
    } else if (this.selectedTyAppointment === '6587bd8a28e28300c3fd3f55') {
      this.listAttentionPelu = reservas?.atencionesPeluqueria || [];
      this.isVet = false;
      this.titleEmploye = 'Peluqueros disponibles'
      if (reservas?.reservasPeluquero) {
        this.listPeluquero = reservas?.reservasPeluquero;
      }
    }
  }

  /** TODO: No se envía el dato del Veterianrio o el Peluquero seleccionado en el API */
  selectVet(index: number): void {
    this.selectedVet = index;
    this.listDays = this.listVeterinario[index].turnos;
    this.cleanSelectVetOrPelu();
  }

  selectPelu(index: number): void {
    this.selectedPelu = index;
    this.listDays = this.listPeluquero[index].turnos;
    this.cleanSelectVetOrPelu();
  }

  selectDay(index: number, fecha: string): void {
    this.selectedDay = index;
    this.listTime = this.listDays[index].turnos;
    this.validateAndSetControlValue('fecha', fecha, this.myForm);
    this.cleanSelectDay();
  }

  selectTime(index: number, time: string): void {
    this.selectedTime = index;
    this.validateAndSetControlValue('turno', time, this.myForm);
  }

  selectAttention(attentionId: string): void{
    const pos = this.listAttentionForm.indexOf(attentionId);
    if(pos === -1){
      this.listAttentionForm.push(attentionId);
    }else {
      this.listAttentionForm.splice(pos, 1);
    }
    this.validateAndSetControlValue('atencionesPeluqueria', this.listAttentionForm, this.myForm);
  }

  postAddAppointmentById(appointment: AddAppointmentRequest): void {
    this.appointmentService
      .postAddAppointmentById(appointment)
      .then((data) => {
        console.log('Se agregó la cita');
        console.log(data);
        this.clearForm();
        this.cleanSelectAppointment();
      }).catch(err => {
        console.log(err);
      });
  }

  getFormAppointmentByClient(idClient: string): void {
    this.appointmentService
      .getFormAppointmentByClient(idClient)
      .then((data) => {
        console.log(data);
        this.formAppointmentData = data;
        this.listTyAppointment = data.tiposCita;
        this.listPets = data.mascotas;
      }).catch(err => {
        console.log(err);
      });
  }

  cleanSelectAppointment(): void {
    this.selectedVet = null;
    this.selectedPelu = null;
    this.selectedDay = null;
    this.selectedTime = null;
    this.listAttentionForm = [];
    this.listVeterinario = [];
    this.listPeluquero = [];
    this.listAttentionPelu = [];
    this.validateAndSetControlValue('fecha', '', this.myForm);
    this.validateAndSetControlValue('turno', '', this.myForm);
    this.validateAndSetControlValue('observaciones', '', this.myForm);
    this.validateAndSetControlValue('atencionesPeluqueria', this.listAttentionForm, this.myForm);
  }

  cleanSelectVetOrPelu(): void {
    this.selectedDay = null;
    this.selectedTime = null;
    this.validateAndSetControlValue('fecha', '', this.myForm);
    this.validateAndSetControlValue('turno', '', this.myForm);
  }

  cleanSelectDay(): void {
    this.selectedTime = null;
    this.validateAndSetControlValue('turno', '', this.myForm);
  }

  validateAndSetControlValue(controlName: string, controlValue: any, form: FormGroup): void {
    const controls = form.get(controlName);
    if (controls) {
      controls.setValue(controlValue);
    } else {
      console.error(`Control "${controlName}" no encontrado en el formulario.`);
    }
  }
}
