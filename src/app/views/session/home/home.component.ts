import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientResponse } from 'src/app/interfaces/client-response.interface';
import { Mascota } from 'src/app/interfaces/user.interface';
import { HomeService } from 'src/app/services/home.service';
import { TypographyAlign } from 'src/app/shared/components/typography/typography.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isContentVisible = false;
  selectedContent: number | null = null;
  image: string = 'Perro-sin-pelo-del-peru.JPG'
  // listPets = [
  //   {
  //     name: 'Cloe',
  //     raza: 'Buldog',
  //     typeAnimal: 'Perro',
  //     typeSex: 'Hembra'
  //   },
  //   {
  //     name: 'Cloe',
  //     raza: 'Shitzu',
  //     typeAnimal: 'Perro',
  //     typeSex: 'Hembra'
  //   },
  //   {
  //     name: 'Cloe',
  //     raza: 'Siberiano',
  //     typeAnimal: 'Perro',
  //     typeSex: 'Hembra'
  //   }
  // ];
  listPets: Mascota[] = [];

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

  listReminder = [
    {
      name: 'Cloe',
      date: '12/10/2024',
      typeAppointment: 'vacuna'
    },
    {
      name: 'Cloe',
      date: '13/10/2024',
      typeAppointment: 'baño'
    },
    {
      name: 'Cloe',
      date: '14/10/2024',
      typeAppointment: 'vacuna'
    }
  ]

  client!: ClientResponse;

  constructor(
    private router: Router,
    private homeService: HomeService
  ) {
    this.showContent(1);
  }

  ngOnInit(): void {
    this.getClientId('658482da6767c41116497027'); 
  }

  showContent(contentNumber: number) {
    this.isContentVisible = false; // Reiniciar la animación
    setTimeout(() => {
      this.isContentVisible = true;
      this.selectedContent = contentNumber;
    }, 50); // Agregar un pequeño retraso para reiniciar la animación
  }

  addAppointment(): void {
    this.router.navigate(["session/add-appointment"]); 
  }

  addPet(): void {
    this.router.navigate(["session/add-pet"]); 
  }

  goToDetailPet(): void {
    this.router.navigate(["session/detail-pet"]); 
  }

  goToDetailAppointment(): void {
    this.router.navigate(["session/detail-appointment"]); 
  }

  getClientId(clientId: string): void {
    this.homeService
      .getClientId(clientId)
      .then((data) => {
        this.client = data;
        this.listPets = data.mascotas;
        console.log(this.client)
        // const newTypeDocuments: SelectOptions[] = data.map((document) => ({
        //   name: document.tipoDocumento,
        //   value: document.id
        // }));

        // this.itemTypeDocument = newTypeDocuments;
      }).catch(err => {
        console.log(err);
      });
  }

  get TypographyAlign(): typeof TypographyAlign {
    return TypographyAlign
  }

}
