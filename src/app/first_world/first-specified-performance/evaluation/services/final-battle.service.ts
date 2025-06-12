import { Injectable } from '@angular/core';
import {environment} from '../../../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FinalBattle} from '../models/FinalBattle';

@Injectable({
  providedIn: 'root'
})
export class FinalBattleService {

  private basePath = environment.serverBasePath + '/final-battles';

  constructor(private http: HttpClient) {}

  // ✅ CAMBIA esto en tu servicio FinalBattleService
  getByLevelId(levelId: number): Observable<FinalBattle[]> {
    return this.http.get<FinalBattle[]>(`${this.basePath}/level/${levelId}`);
  }

}
