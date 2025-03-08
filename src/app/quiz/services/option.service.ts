import { Injectable } from '@angular/core';
import {environment} from "../../shared/environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {Option} from '../model/Option';
import {Question} from '../model/Question';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  basePath = environment.serverBasePath;
  url: string = '/options';
  //url: string = '/Option';

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  getAnswerQuestions(): Observable<Question[]> {
    return this.http
      .get<Question[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return [];
  }
}
