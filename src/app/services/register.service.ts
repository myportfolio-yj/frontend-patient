import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TypeDocument } from '../interfaces/type-document';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../config/endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

//   validateUser(userName: string, password: string): Observable<User>{
//     return this.httpClient.post<User>(this.apiService.REMOTE_END_POINTS.URL_AUTH_POST_VALIDATE_USER,
//       { email: userName, password: password });
//   }

  async getTypeDocument(): Promise<TypeDocument> {
    try {
      
      const response: TypeDocument = await firstValueFrom(
        this.httpClient.get<TypeDocument>(`${environment.API_URL}${Endpoints.TYPE_DOCUMENT}`
         )
      );
      return response;
    } catch (error) {
      throw error
    }
  }
}
