import { Injectable } from '@angular/core';
import {environment} from '../../../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {PlayerTomesReviewed} from '../models/PlayerTomesReviewed';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TomesReviewedService {
  private apiUrl = `${environment.serverBasePath}/player-tomes-reviewed`;

  constructor(private http: HttpClient) {}

  markAsRead(data: PlayerTomesReviewed): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
