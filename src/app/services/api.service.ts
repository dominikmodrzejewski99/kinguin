import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Api, Offer} from '../interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOffers(id: string): Observable<Offer[]> {
    const headers = new HttpHeaders({
      'x-test': environment.test
    });
    return this.http.get<Api>(`${this.apiUrl}/${id}`, { headers }).pipe(
      map(response => response._embedded.kinguinOffer)
    );
  }
}
