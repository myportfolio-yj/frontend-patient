import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../config/endpoints.enum';
import { ClientResponse } from '../interfaces/client-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

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
}
