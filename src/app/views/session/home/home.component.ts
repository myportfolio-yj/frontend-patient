import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cita, ClientResponse, Mascota, Recordatorio } from 'src/app/interfaces/client-response.interface';
import { HomeService } from 'src/app/services/home.service';
import { TypographyAlign } from 'src/app/shared/components/typography/typography.enum';
import { LOCAL_STORAGE } from 'src/app/utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isContentVisible = false;
  selectedContent: number | null = null;
  image: string = 'Perro-sin-pelo-del-peru.JPG'
  listPets: Mascota[] = [];

  listAppointment: Cita[] = [];

  listReminder: Recordatorio[] = []

  client!: ClientResponse;

  latitud: number = 37.7749; // Reemplaza con tu latitud
  longitud: number = -122.4194; // Reemplaza con tu longitud
  googleMapsUrl!: SafeResourceUrl;

  constructor(
    private router: Router,
    private homeService: HomeService,
    private sanitizer: DomSanitizer
  ) {
    this.showContent(1);
  }

  ngOnInit(): void {
    const clientId = localStorage.getItem(LOCAL_STORAGE.USER);
    if(clientId){
      this.getClientId(clientId); 
    }
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
        console.log(data);
        this.client = data;
        this.listPets = data.mascotas;
        this.listAppointment = data.citas;
        this.listReminder = data.recordatorio;
      }).catch(err => {
        console.log(err);
      });
  }

  get TypographyAlign(): typeof TypographyAlign {
    return TypographyAlign
  }

  logout(event: any): void {
    console.log('cerrar sesión')
  }

  abrirGoogleMaps() {
    const url = `https://www.google.com/maps/search/?api=1&query=${this.latitud},${this.longitud}`;
    console.log(url);
    this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    // Abre una nueva pestaña con la URL de Google Maps
    window.open(this.googleMapsUrl.toString(), '_blank');
  }
}
