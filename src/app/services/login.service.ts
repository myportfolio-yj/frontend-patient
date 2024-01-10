import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../config/endpoints.enum';
import { User } from '../interfaces/user.interface';
import { LoginRequest } from '../interfaces/login-request.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  async postLogin(login: LoginRequest): Promise<User> {
    try {
      const response: User = await firstValueFrom(
        this.httpClient.post<User>(`${environment.API_URL}${Endpoints.POST_LOGIN}`, login)
      );
      return response;
    } catch (error) {
      throw error
    }
  }
}
