import { Injectable } from '@angular/core';
import {environment} from '../../../../shared/environments/environment.development';
import {PlayerMatchingPairRequest} from '../model/PlayerMatchingPairRequest';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerMatchingPairService {

  private baseUrl = `${environment.serverBasePath}/player-matching-pairs`;

  constructor(private http: HttpClient) {}

  save(request: PlayerMatchingPairRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/save`, request);
  }
}
