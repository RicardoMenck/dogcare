import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly connecet = `${environment.api}/user`;

  constructor(private httpClient: HttpClient) {}

  listUser(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.connecet);
  }

  findByID(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.connecet}/${id}`);
  }

  saveUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.connecet, user);
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${this.connecet}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<UserModel> {
    return this.httpClient.delete<UserModel>(`${this.connecet}/${id}`);
  }
}
