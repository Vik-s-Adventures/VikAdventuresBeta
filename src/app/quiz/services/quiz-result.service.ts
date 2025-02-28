import { Injectable } from '@angular/core';
import {environment} from "../../shared/environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {Result} from "../model/Result";

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {

  basePath = environment.serverBasePath;
  //url: string = '/Result';
  url: string = '/results';

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  getQuizResults(): Observable<Result[]> {
    return this.http
      .get<Result[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error en la solicitud:', error);
    return [];
  }
}
