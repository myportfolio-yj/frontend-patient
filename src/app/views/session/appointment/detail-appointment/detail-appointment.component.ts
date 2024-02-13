import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TypographyAlign } from 'src/app/shared/components/typography/typography.enum';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentDetailResponse } from 'src/app/interfaces/appointment-detail-response.interface';

@Component({
  selector: 'app-detail-appointment',
  templateUrl: './detail-appointment.component.html',
  styleUrls: ['./detail-appointment.component.scss']
})
export class DetailAppointmentComponent implements OnInit  {

  image = 'Perro-sin-pelo-del-peru.JPG';

  headerColor: string = 'transparent'; // Inicialmente transparente

  dataAppointment: AppointmentDetailResponse = {
    id: '',
    cliente: {
      id: '',
      nombres: '',
      apellidos: '',
      celular: '',
      fijo: '',
      email: '',
      tipoDocumento: {
        id: '',
        tipoDocumento: ''
      },
      documento: ''
    },
    nombreMascota: '',
    idMascota: '',
    mascota: {
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      sexo: {
        id: '',
        sexo: ''
      },
      especie: {
        id: '',
        especie: ''
      },
      raza: {
        id: '',
        raza: ''
      },
      esterilizado: false,
      alergias: [],
      vacunas: [],
      foto: '',
      id: '',
      codIdentificacion: ''
    },
    tipoCita: '',
    idTipoCita: '',
    atencionesPeluqueria: [],
    fecha: '',
    turno: '',
    observaciones: '',
    checkIn: false,
    idAtencion: '',
    recetas: []
  };
  idAppointment = '';

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

  constructor(
    private location: Location,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state
    if(state){
      this.idAppointment = state['idAppointment'];
      console.log('this.idAppointment',this.idAppointment);
    }else {
      this.router.navigate(["session/home"])
    }
  }

  get TypographyAlign(): typeof TypographyAlign {
    return TypographyAlign
  }

  ngOnInit(): void {
    this.getDetailAppointment();
  }

  goBack(): void {
    this.location.back();
  }

  getDetailAppointment(): void {
    this.appointmentService
      .getDetailAppointment(this.idAppointment)
      .then((data) => {
        console.log(data);
        this.dataAppointment = data;
      }).catch(err => {
        console.log(err);
      });
  }

  isObs(): boolean {
    return this.dataAppointment.observaciones?.length > 0 || false;
  }

}
