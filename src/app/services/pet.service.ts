import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../config/endpoints.enum';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { SexResponse } from '../interfaces/sex-response.interface';
import { Raza, SpeciesResponse } from '../interfaces/species-response.interface';
import { AllergiesResponse } from '../interfaces/allergies-response.interface';
import { VaccinesResponse } from '../interfaces/vaccines-response.interface';
import { PetRequest } from '../interfaces/pet-request.interface';
import { PetDetailResponse } from '../interfaces/pet-detail-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  listSpecies: SpeciesResponse[] = [];
  private selectedSpeciesSubject = new BehaviorSubject<string>('');
  selectedSpecies$: Observable<string> = this.selectedSpeciesSubject.asObservable();

  private selectedBreedSubject = new BehaviorSubject<Raza[]>([]);
  selectedBreeds$: Observable<Raza[]> = this.selectedBreedSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  async getSex(): Promise<SexResponse[]> {
    try {
      const response: SexResponse[] = await firstValueFrom(
        this.httpClient.get<SexResponse[]>(`${environment.API_URL_MASCOTA}${Endpoints.GET_SEX}`)
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

  async postAddPetById(pet: PetRequest): Promise<RegisterResponse> {
    try {
      const response: any = await firstValueFrom(
        this.httpClient.post<any>(`${environment.API_URL_MASCOTA}${Endpoints.POST_PET}`, pet)
      );
      return response;
    } catch (error) {
      throw error
    }
  }

  async getDetailPet(idPet: string): Promise<PetDetailResponse> {
    try {
      const response = await firstValueFrom(
        this.httpClient.get<PetDetailResponse>(`${environment.API_URL_MASCOTA}${Endpoints.GET_PET}/${idPet}`)
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
