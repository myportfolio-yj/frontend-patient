import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../config/endpoints.enum';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { Raza, SpeciesResponse } from '../interfaces/species-response.interface';
import { AllergiesResponse } from '../interfaces/allergies-response.interface';
import { VaccinesResponse } from '../interfaces/vaccines-response.interface';
import { FormAppointmentResponse } from '../interfaces/form-appointment-response.interface';
import { AddAppointmentRequest } from '../interfaces/add-appointment-request.interface';
import { AppointmentDetailResponse } from '../interfaces/appointment-detail-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  listSpecies: SpeciesResponse[] = [];
  private selectedSpeciesSubject = new BehaviorSubject<string>('');
  selectedSpecies$: Observable<string> = this.selectedSpeciesSubject.asObservable();

  private selectedBreedSubject = new BehaviorSubject<Raza[]>([]);
  selectedBreeds$: Observable<Raza[]> = this.selectedBreedSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  async getFormAppointmentByClient(idClient: string): Promise<FormAppointmentResponse> {
    try {
      const response: FormAppointmentResponse = await firstValueFrom(
        this.httpClient.get<FormAppointmentResponse>(`${environment.API_URL_CLINICA}${Endpoints.GET_FORM_APPOINTMENT}/${idClient}`)
      );
      return response;
    } catch (error) {
      throw error
    }
  }

  async postAddAppointmentById(appointment: AddAppointmentRequest): Promise<any> {
    try {
      const response: any = await firstValueFrom(
        this.httpClient.post<any>(`${environment.API_URL_CLINICA}${Endpoints.APPOINTMENT}`, appointment)
      );
      return response;
    } catch (error) {
      throw error
    }
  }

  async getSpecies(): Promise<SpeciesResponse[]> {
    try {
      this.listSpecies = await firstValueFrom(
        this.httpClient.get<SpeciesResponse[]>(`${environment.API_URL_MASCOTA}${Endpoints.GET_SPECIE}`)
      );
      return this.listSpecies;
    } catch (error) {
      throw error
    }
  }

  async getAllergies(): Promise<AllergiesResponse[]> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<AllergiesResponse[]>(`${environment.API_URL_MASCOTA}${Endpoints.GET_ALLERGIES}`)
      );
      return response;
    } catch (error) {
      throw error
    }
  }

  async getVaccines(): Promise<VaccinesResponse[]> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<VaccinesResponse[]>(`${environment.API_URL_MASCOTA}${Endpoints.GET_VACCINES}`)
      );
      return response;
    } catch (error) {
      throw error
    }
  }

  async getDetailAppointment(idAppointment: string): Promise<AppointmentDetailResponse> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<AppointmentDetailResponse>(`${environment.API_URL_CLINICA}${Endpoints.APPOINTMENT}/${idAppointment}`)
      );
      return response;
    } catch (error) {
      throw error
    }
  }
  
  getBreedsBySpecies(species: string): Raza[] {
    const breed = this.listSpecies.find((b) => b.especie === species);
    return breed ? breed.razas : [];
  }

  setSelectedSpecies(species: string): void {
    this.selectedSpeciesSubject.next(species);
  }

  setSelectedBreeds(breeds: Raza[]): void {
    this.selectedBreedSubject.next(breeds);
  }
}
