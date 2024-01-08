import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-pet',
  templateUrl: './detail-pet.component.html',
  styleUrls: ['./detail-pet.component.scss']
})
export class DetailPetComponent {

  image = 'Perro-sin-pelo-del-peru.JPG';

  headerColor: string = 'transparent'; // Inicialmente transparente

  dataPet = {
    nombre: 'Cloe',
    apellidos: 'Jimenez',
    fechaNacimiento: '12/12/2023',
    sexo: 'Hembra',
    especie: 'Perro',
    raza: 'Chusco',
    esterilizado: 'Si'
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

  constructor(
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

}
