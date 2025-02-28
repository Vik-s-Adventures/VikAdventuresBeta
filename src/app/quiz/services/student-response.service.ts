import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../shared/environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class StudentResponseService {
  basePath = environment.serverBasePath;
  url: string = '/responses';
  //url: string = '/Option';

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  constructor(private http: HttpClient) {}

  //Método para guardar una respuesta
  saveResponse(response: Response): Observable<Response> {
    return this.http.post<Response>(this.resourcePath(), response);
  }

  //Método para obtener todas las respuestas (opcional)
  getResponses(): Observable<Response[]> {
    return this.http.get<Response[]>(this.resourcePath());
  }
}
