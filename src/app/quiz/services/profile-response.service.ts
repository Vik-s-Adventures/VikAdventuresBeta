import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../shared/environments/environment.development";
import {ProfileResponse} from '../model/ProfileResponse';

@Injectable({
  providedIn: 'root'
})
export class ProfileResponseService {
  basePath = environment.serverBasePath;
  url: string = '/responses';

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  constructor(private http: HttpClient) {}

  //Método para guardar una respuesta
  saveResponse(response: ProfileResponse): Observable<Response> {
    return this.http.post<Response>(this.resourcePath(), response);
  }


}
