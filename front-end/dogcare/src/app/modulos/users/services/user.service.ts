import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, take } from 'rxjs';
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

  loadUserById(idUser) {
    return this.httpClient.get(`${this.connect}/${idUser}`).pipe(take(1));
  }

  findByID(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.connect}/${id}`);
  }

  saveUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.connect, user).pipe(take(1));
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this.httpClient
      .put<UserModel>(`${this.connect}/${user.idUser}`, user)
      .pipe(take(1));
  }

  deleteUser(id: number): Observable<UserModel> {
    return this.httpClient
      .delete<UserModel>(`${this.connect}/${id}`)
      .pipe(take(1));
  }
}
