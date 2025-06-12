import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../shared/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class LearningPathService {

  private basePath = environment.serverBasePath;
  private url: string = '/learning-path';

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  constructor(private http: HttpClient) {}

  getLearningPath(profileId: number, quizId: number, token: string): Observable<number[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.post<number[]>(
      `${this.resourcePath()}?profileId=${profileId}&quizId=${quizId}`,
      {}, // cuerpo vacío
      { headers }
    );
  }

  generateLearningPath(profileId: number, quizId: number): Observable<any> {
    return this.http.post(
      `${this.resourcePath()}?profileId=${profileId}&quizId=${quizId}`,
      {}
    );
  }

}
