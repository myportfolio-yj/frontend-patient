import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TypeDocument } from '../interfaces/type-document-response.interface';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../config/endpoints.enum';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { RegisterRequest } from '../interfaces/register-request.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  async getTypeDocuments(): Promise<TypeDocument[]> {
    try {
      const response: TypeDocument[] = await firstValueFrom(
        this.httpClient.get<TypeDocument[]>(`${environment.API_URL_USUARIO}${Endpoints.TYPE_DOCUMENT}`
         )
      );
      return response;
    } catch (error) {
      throw error
    }
  }

  async postRegister(register: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response: RegisterResponse = await firstValueFrom(
        this.httpClient.post<RegisterResponse>(`${environment.API_URL_USUARIO}${Endpoints.POST_REGISTER}`, register)
      );
      return response;
    } catch (error) {
      throw error
    }
  }
}
