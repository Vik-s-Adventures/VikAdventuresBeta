import { Injectable } from '@angular/core';
import {environment} from '../../../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Riddle} from '../model/Riddle';


@Injectable({
  providedIn: 'root'
})
export class RiddleService {


  private basePath = environment.serverBasePath;
  private url = '/riddles';

  constructor(private http: HttpClient) {
  }


  getByTrialId(trialId: number): Observable<Riddle> {
    return this.http.get<Riddle[]>(`${this.basePath}${this.url}/trial/${trialId}`).pipe(
      map(riddles => {
        if (!riddles || riddles.length === 0) {
          throw new Error('No se encontraron riddles para este trial');
        }
        return riddles[0]; // Devuelve el primero
      })
    );
  }

}
