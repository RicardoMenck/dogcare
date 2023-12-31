import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from './login.model';

//dessa forma o servicço fica local
@Injectable()
export class LoginService {
  private api: string = 'http://localhost:8080/';
  readonly httpClient: HttpClient = inject(HttpClient);

  login(email: string, password: string): Observable<LoginModel> {
    return this.httpClient.post<LoginModel>(`${this.api}login`, {
      email: email,
      password: password,
    });
  }
}
