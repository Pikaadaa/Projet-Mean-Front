import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';

@Injectable()
export class CarService {

  constructor(private http: HttpClient) { }

  get(): Observable<Car[]> {
    return this.http.get<Car[]>(environment.iutApiBaseUrl + "/cars");
  }

  getById(id: number): Observable<Car> {
    return this.http.get<Car>(environment.iutApiBaseUrl + "/cars/" + id);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(environment.iutApiBaseUrl + "/cars/" + id);
  }

  update(car: Car): Observable<string> {
    return this.http.put<string>(environment.iutApiBaseUrl + "/cars/" + car.id, car);
  }

  create(car: Car): Observable<string> {
    return this.http.post<string>(environment.iutApiBaseUrl + "/cars", car);
  }
}
