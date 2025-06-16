import { Injectable } from '@angular/core';
import {environment} from '../../../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {PlayerLinkingPairRequest} from '../model/PlayerLinkingPairRequest';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerLinkingPairService {
  private baseUrl = `${environment.serverBasePath}/player-linking-pairs`;

  constructor(private http: HttpClient) {}

  save(request: PlayerLinkingPairRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/save`, request);
  }
}
