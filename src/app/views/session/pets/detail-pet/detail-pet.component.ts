import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PetService } from 'src/app/services/pet.service';
import { PetDetailResponse, Alergia } from 'src/app/interfaces/pet-detail-response.interface';

@Component({
  selector: 'app-detail-pet',
  templateUrl: './detail-pet.component.html',
  styleUrls: ['./detail-pet.component.scss']
})
export class DetailPetComponent implements OnInit {

  image = 'Perro-sin-pelo-del-peru.JPG';

  headerColor: string = 'transparent'; // Inicialmente transparente

  // dataPet = {
  //   nombre: 'Cloe',
  //   apellidos: 'Jimenez',
  //   fechaNacimiento: '12/12/2023',
  //   sexo: 'Hembra',
  //   especie: 'Perro',
  //   raza: 'Chusco',
  //   esterilizado: 'Si'
  // }
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
    private petService: PetService
  ) {
  }

  ngOnInit(): void {
    this.getDetailPet();
  }

  goBack(): void {
    this.location.back();
  }

  getDetailPet(): void {
    this.petService
      .getDetailPet('65826db7f1da1054f7569ac1')
      .then((data) => {
        console.log(data);
        this.dataPet = data;
      }).catch(err => {
        console.log(err);
      });
  }

}
