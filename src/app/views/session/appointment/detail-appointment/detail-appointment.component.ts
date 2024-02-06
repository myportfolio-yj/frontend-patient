import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PetDetailResponse } from 'src/app/interfaces/pet-detail-response.interface';
import { TypographyAlign } from 'src/app/shared/components/typography/typography.enum';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-detail-appointment',
  templateUrl: './detail-appointment.component.html',
  styleUrls: ['./detail-appointment.component.scss']
})
export class DetailAppointmentComponent implements OnInit  {

  image = 'Perro-sin-pelo-del-peru.JPG';

  headerColor: string = 'transparent'; // Inicialmente transparente

  dataPet: PetDetailResponse = {
    id: '',
    codIdentificacion: '',
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
    foto: ''
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
        this.dataPet = data;
      }).catch(err => {
        console.log(err);
      });
  }

}
