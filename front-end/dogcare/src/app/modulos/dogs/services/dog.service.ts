import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, delay, tap, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DogModel } from '../models/dog.model';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private readonly connect = `${environment.api}/dog`;

  constructor(private httpClient: HttpClient) {}
  //Headers
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
  //   }),
  // };

  //120
  listDog(): Observable<DogModel[]> {
    return this.httpClient
      .get<DogModel[]>(this.connect)
      .pipe(delay(2000), tap(console.log));
  }

  findByID(id: number): Observable<DogModel> {
    return this.httpClient.get<DogModel>(`${this.connect}/${id}`);
  }

  saveDog(dog: DogModel): Observable<DogModel> {
    return this.httpClient.post<DogModel>(this.connect, dog);
    // .post<DogModel>(this.connect, dog, this.httpOptions)
  }

  updateDog(dog: DogModel): Observable<DogModel> {
    return this.httpClient.put<DogModel>(`${this.connect}/${dog.idDog}`, dog);
  }

  deleteDog(id: number): Observable<DogModel> {
    return this.httpClient.delete<DogModel>(`${this.connect}/${id}`);
  }
}
