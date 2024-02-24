import { Component, HostListener, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PetService } from 'src/app/services/pet.service';
import { PetDetailResponse, Alergia } from 'src/app/interfaces/pet-detail-response.interface';
import { TypographyAlign } from 'src/app/shared/components/typography/typography.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-pet',
  templateUrl: './detail-pet.component.html',
  styleUrls: ['./detail-pet.component.scss']
})
export class DetailPetComponent implements OnInit {

  image = 'default_mabynn.jpg';

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
    foto: '',
    imagen: '',
    path: ''
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
  idPet = '';

  constructor(
    private location: Location,
    private petService: PetService,
    private router: Router
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state
    if(state){
      this.idPet = state['idPet'];
      console.log('this.idPet',this.idPet);
    }else {
      this.router.navigate(["session/home"])
    }
  }

  get TypographyAlign(): typeof TypographyAlign {
    return TypographyAlign
  }

  ngOnInit(): void {
    this.getDetailPet();
  }

  goBack(): void {
    this.location.back();
  }

  getDetailPet(): void {
    this.petService
      .getDetailPet(this.idPet)
      .then((data) => {
        console.log(data);
        this.dataPet = data;
      }).catch(err => {
        console.log(err);
      });
  }

  isListVacunes(): boolean {
    return this.dataPet.vacunas?.length > 0 || false;
  }

  isListAllergies(): boolean {
    return this.dataPet.alergias?.length > 0 || false;
  }

}
