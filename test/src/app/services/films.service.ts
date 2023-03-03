import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/films'
  }
  //obtenemos las peliculas de SWAPI staswars
  getFilms(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}`)
  }
  //obtenemos las peliculas de SWAPI staswars por id
  getFilmById(id: number): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }
  //obtenemos datos especificos de SWAPI staswars por url
  getData(url: string): Observable<any> {
    return this.http.get<any>(`${url}`)
  }

}
