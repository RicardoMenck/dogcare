import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../../modulos/users/user/user.model';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly connecet = `${environment.api}/register`;

  constructor(private httpClient: HttpClient) {}

  registerUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.connecet, user);
  }
}
