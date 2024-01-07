import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DogModel } from '../models/dog.model';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private readonly connecet = `${environment.api}/dog`;

  constructor(private httpClient: HttpClient) {}
  //Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
    }),
  };

  listDog(): Observable<DogModel[]> {
    return this.httpClient
      .get<DogModel[]>(this.connecet)
      .pipe(retry(2), catchError(this.handleError));
  }

  findByID(id: number): Observable<DogModel> {
    return this.httpClient
      .get<DogModel>(`${this.connecet}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveDog(dog: DogModel): Observable<DogModel> {
    return this.httpClient
      .post<DogModel>(this.connecet, dog, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateDog(dog: DogModel): Observable<DogModel> {
    return this.httpClient
      .put<DogModel>(`${this.connecet}/${dog.id}`, dog)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteDog(id: number): Observable<DogModel> {
    return this.httpClient
      .delete<DogModel>(`${this.connecet}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  //Manipulando erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //Erro ocorreu do lado do client
      errorMessage = error.error.message;
    }
    // Erro ocorreu no lado do servidor
    else {
      errorMessage =
        `Códgo do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
