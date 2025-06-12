import { Injectable } from '@angular/core';
import {environment} from '../../../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RiddleDetail} from '../model/RiddleDetails';

@Injectable({
  providedIn: 'root'
})
export class RiddleDetailService {
  private basePath = environment.serverBasePath;
  private url = '/riddle-details';
  constructor(private http: HttpClient) {}


  getByRiddleId(riddleId: number): Observable<RiddleDetail[]> {
    return this.http.get<RiddleDetail[]>(`${this.basePath}${this.url}/riddle/${riddleId}`);
  }


}
