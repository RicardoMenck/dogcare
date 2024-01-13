import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly connect = `${environment.api}/user`;

  constructor(private httpClient: HttpClient) {}

  listUser(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.connect);
  }

  findByID(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.connect}/${id}`);
  }

  saveUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.connect, user);
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>(
      `${this.connect}/${user.idUser}`,
      user
    );
  }

  deleteUser(id: number): Observable<UserModel> {
    return this.httpClient.delete<UserModel>(`${this.connect}/${id}`);
  }
}
