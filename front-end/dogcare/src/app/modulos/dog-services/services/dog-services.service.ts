import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, take } from 'rxjs';
import { DogServicesModel } from '../models/dog-services.model';

@Injectable({
  providedIn: 'root',
})
export class DogServicesService {
  private readonly connect = `${environment.api}/services`;

  constructor(private httpClient: HttpClient) {}

  listServices(): Observable<DogServicesModel[]> {
    return this.httpClient.get<DogServicesModel[]>(this.connect);
  }

  loadServiceById(idService) {
    return this.httpClient.get(`${this.connect}/${idService}`).pipe(take(1));
  }

  findServiceById(id: number): Observable<DogServicesModel> {
    return this.httpClient.get<DogServicesModel>(`${this.connect}/${id}`);
  }

  saveService(service: DogServicesModel): Observable<DogServicesModel> {
    return this.httpClient
      .post<DogServicesModel>(this.connect, service)
      .pipe(take(1));
    // .post<DogModel>(this.connect, dog, this.httpOptions)
  }

  updateService(service: DogServicesModel): Observable<DogServicesModel> {
    return this.httpClient
      .put<DogServicesModel>(`${this.connect}/${service.idService}`, service)
      .pipe(take(1));
  }

  deleteService(id: number): Observable<DogServicesModel> {
    return this.httpClient
      .delete<DogServicesModel>(`${this.connect}/${id}`)
      .pipe(take(1));
  }
}
