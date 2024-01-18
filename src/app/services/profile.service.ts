import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../config/endpoints.enum';
import { ClientResponse } from '../interfaces/client-response.interface';
import { ProfileRequest } from '../interfaces/profile-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  async getClientId(clientId: string): Promise<ClientResponse> {
    try {
      const response: ClientResponse = await firstValueFrom(
        this.httpClient.get<ClientResponse>(`${environment.API_URL_USUARIO}${Endpoints.GET_CLIENT}/${clientId}`)
      );
      return response;
    } catch (error) {
      throw error
    }
  }

  async putProfile(idClient: string, profile: ProfileRequest): Promise<ProfileRequest> {
    try {
      const response: any = await firstValueFrom(
        this.httpClient.put<any>(`${environment.API_URL_USUARIO}${Endpoints.PUT_CLIENT}/${idClient}`, profile)
      );
      return response;
    } catch (error) {
      throw error
    }
  }
}
