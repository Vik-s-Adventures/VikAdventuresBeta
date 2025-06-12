import { Injectable } from '@angular/core';
import {environment} from '../../../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ObstacleOption} from '../models/ObstacleOptions';

@Injectable({
  providedIn: 'root'
})
export class ObstacleOptionService {

  private basePath = environment.serverBasePath + '/obstacle-options';

  constructor(private http: HttpClient) {}

  getByObstacleId(obstacleId: number): Observable<ObstacleOption[]> {
    return this.http.get<ObstacleOption[]>(`${this.basePath}/obstacle/${obstacleId}`);
  }
}
