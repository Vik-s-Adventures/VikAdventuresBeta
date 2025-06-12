import { Injectable } from '@angular/core';
import {environment} from '../../../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Obstacle} from '../models/Obstacle';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObstacleService {
  private basePath = environment.serverBasePath + '/obstacles';

  constructor(private http: HttpClient) {}

  getByFinalBattleId(finalBattleId: number): Observable<Obstacle[]> {
    return this.http.get<Obstacle[]>(`${this.basePath}/final-battle/${finalBattleId}`);
  }

  getById(obstacleId: number): Observable<Obstacle> {
    return this.http.get<Obstacle>(`${this.basePath}/${obstacleId}`);
  }


}
