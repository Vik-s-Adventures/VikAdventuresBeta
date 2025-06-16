import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../shared/environments/environment.development';
import {PlayerFinalBattleUpdateRequest} from '../models/PlayerFinalBattleUpdateRequest';

class PlayerFinalBattleRequest {
}

@Injectable({
  providedIn: 'root'
})
export class PlayerFinalBattleService {
  private baseUrl = `${environment.serverBasePath}/player-final-battles`;
  constructor(private http: HttpClient) {}

  // POST: crea una respuesta final
  save(request: PlayerFinalBattleRequest): Observable<any> {
    console.log('🌐 POST /player-final-battles con:', request);
    return this.http.post(`${this.baseUrl}`, request);
  }

  // PUT: actualiza la respuesta si ya existe
  update(updateRequest: PlayerFinalBattleUpdateRequest): Observable<any> {
    console.log('🌐 PUT /player-final-battles con:', updateRequest);
    return this.http.put(`${this.baseUrl}`, updateRequest);
  }
}
