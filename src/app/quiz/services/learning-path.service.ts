import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LearningPathService {
  private apiUrl = 'http://localhost:8080/api/v1/learning-path';

  constructor(private http: HttpClient) {}

  getLearningPath(profileId: number, quizId: number, token: string): Observable<number[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.post<number[]>(
      `${this.apiUrl}?profileId=${profileId}&quizId=${quizId}`,
      {}, // cuerpo vacío
      { headers }
    );
  }
}
