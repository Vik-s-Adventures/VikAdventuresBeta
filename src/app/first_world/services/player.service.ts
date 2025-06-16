import { Injectable } from '@angular/core';
import {environment} from '../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Player} from '../models/Player';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = `${environment.serverBasePath}/api/v1/players`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl);
  }


}
