import { Injectable } from '@angular/core';
import {environment} from '../../../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Trial} from '../model/Trial';

@Injectable({
  providedIn: 'root'
})
export class TrialService {
  private basePath = environment.serverBasePath;
  private url = '/trials';
  constructor(private http: HttpClient) {}


  getByLevelId(levelId: number): Observable<Trial> {
    return this.http.get<Trial[]>(`${this.basePath}${this.url}/level/${levelId}`).pipe(
      map(trials => trials[0]) // Tomar solo el primero
    );
  }

}
