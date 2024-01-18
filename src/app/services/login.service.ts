import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../config/endpoints.enum';
import { LoginRequest } from '../interfaces/login-request.interface';
import { ClientResponse } from '../interfaces/client-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  async postLogin(login: LoginRequest): Promise<ClientResponse> {
    try {
      const response: ClientResponse = await firstValueFrom(
        this.httpClient.post<ClientResponse>(`${environment.API_URL_USUARIO}${Endpoints.POST_LOGIN}`, login)
      );
      return response;
    } catch (error) {
      throw error
    }
  }
}
