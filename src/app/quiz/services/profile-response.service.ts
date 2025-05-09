import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../shared/environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class ProfileResponseService {
  basePath = environment.serverBasePath;
  url: string = '/responses';

  constructor(private http: HttpClient) {}

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // Método para guardar una respuesta con token
  saveResponse(response: { optionId: number; profileId: number }): Observable<Response> {
    return this.http.post<Response>(this.resourcePath(), response, this.getHttpOptions());
  }
}
