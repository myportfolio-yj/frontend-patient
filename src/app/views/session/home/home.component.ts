import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isContentVisible = false;
  selectedContent: number | null = null;
  image: string = 'brand-logo-2.svg'
  listPets = [
    {
      name: 'Cloe',
      raza: 'Buldog',
      typeAnimal: 'Perro',
      typeSex: 'Hembra'
    },
    {
      name: 'Cloe',
      raza: 'Shitzu',
      typeAnimal: 'Perro',
      typeSex: 'Hembra'
    },
    {
      name: 'Cloe',
      raza: 'Siberiano',
      typeAnimal: 'Perro',
      typeSex: 'Hembra'
    }
  ]

  listAppointment = [
    {
      name: 'Cloe',
      date: '12/10/2024',
      time: '10:00'
    },
    {
      name: 'Cloe',
      date: '13/10/2024',
      time: '11:00'
    },
    {
      name: 'Cloe',
      date: '14/10/2024',
      time: '12:00'
    }
  ]

  constructor() {
    this.showContent(1);
  }

  showContent(contentNumber: number) {
    this.isContentVisible = false; // Reiniciar la animación
    setTimeout(() => {
      this.isContentVisible = true;
      this.selectedContent = contentNumber;
    }, 50); // Agregar un pequeño retraso para reiniciar la animación
  }

}
