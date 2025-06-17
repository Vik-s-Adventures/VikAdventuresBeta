import { Injectable } from '@angular/core';
import {environment} from '../../shared/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlayerProgress} from '../models/PlayerProgress';

@Injectable({
  providedIn: 'root'
})
export class PlayerProgressService {
  private baseUrl = `${environment.serverBasePath}/player-progress`;

  constructor(private http: HttpClient) {}

  getByPlayerAndLevel(playerId: number, levelId: number): Observable<PlayerProgress> {
    return this.http.get<PlayerProgress>(`${this.baseUrl}/player/${playerId}/level/${levelId}`);
  }

  update(progress: PlayerProgress): Observable<PlayerProgress> {
    return this.http.post<PlayerProgress>(`${this.baseUrl}/sync`, progress);
  }


}
