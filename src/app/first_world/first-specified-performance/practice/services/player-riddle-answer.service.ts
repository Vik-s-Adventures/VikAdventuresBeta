import { Injectable } from '@angular/core';
import {environment} from '../../../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {PlayerRiddleAnswer} from '../model/PlayerRiddleAnswer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerRiddleAnswerService {
  private basePath = environment.serverBasePath;
  private url = '/player-riddle-answers';

  constructor(private http: HttpClient) {}

  create(answer: PlayerRiddleAnswer): Observable<any> {
    return this.http.post(`${this.basePath}${this.url}`, answer);
  }

  update(answer: PlayerRiddleAnswer): Observable<any> {
    return this.http.put(`${this.basePath}${this.url}`, answer);
  }
}
