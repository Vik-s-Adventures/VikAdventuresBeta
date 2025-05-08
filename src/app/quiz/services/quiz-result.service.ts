import { Injectable } from '@angular/core';
import {environment} from "../../shared/environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, forkJoin, map, Observable, of, retry, switchMap, throwError} from "rxjs";
import {Result} from '../model/Result';
import {Profile} from '../../profile/model/Profile';


@Injectable({
  providedIn: 'root'
})
export class QuizResultService {
  basePath = environment.serverBasePath;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  // ✅ GET /results para obtener todos los resultados directamente
  getAllResults(): Observable<Result[]> {
    const resultsUrl = `${this.basePath}/results`;
    return this.http.get<Result[]>(resultsUrl, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Error al obtener resultados:', error);
        return throwError(() => error);
      })
    );
  }
  saveResult(result: Result): Observable<Result> {
    const url = `${this.basePath}/results`;
    return this.http.post<Result>(url, result, this.httpOptions).pipe(
      catchError((error) => {
        console.error('❌ Error al guardar resultado:', error);
        return throwError(() => error);
      })
    );
  }

  getResultByProfileIdAndQuizId(profileId: number, quizId: number): Observable<Result | null> {
    const url = `${this.basePath}/results/profile/${profileId}/quiz/${quizId}`;
    return this.http.get<Result>(url, this.httpOptions).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.warn('📭 No existe resultado previo');
          return of(null); // No se encontró => devolver null
        } else {
          console.error('❌ Error al verificar resultado existente:', error);
          return throwError(() => error);
        }
      })
    );
  }


  // ✅ GET /results + /profiles/{id} para mostrar ranking con nombres
  getRankedStudents(): Observable<any[]> {
    const resultsUrl = `${this.basePath}/results`;
    const profileUrl = `${this.basePath}/profiles`;

    return this.http.get<Result[]>(resultsUrl, this.httpOptions).pipe(
      switchMap(results => {
        // @ts-ignore
        const sortedResults = results.sort((a, b) => b.score - a.score);
        const requests = sortedResults.map(result =>
          this.http.get<Profile>(`${profileUrl}/${result.profileId}`, this.httpOptions).pipe(
            map(profile => ({
              firstName: profile.firstName,
              lastName: profile.lastName,
              score: result.score
            })),
            catchError(() => {
              // Si falla un perfil, se ignora ese resultado
              return [];
            })
          )
        );
        return forkJoin(requests);
      }),
      catchError((error) => {
        console.error('Error al obtener ranking:', error);
        return throwError(() => error);
      })
    );
  }
}
