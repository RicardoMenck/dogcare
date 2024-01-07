import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from './login.model';
import { environment } from '../../../environments/environment';

//dessa forma o serviço fica local
@Injectable()
export class LoginService {
  private readonly connect = `${environment.api}/login`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${this.connect}`, {
      email: email,
      password: password,
    });
  }
}
