import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tome } from '../models/Tome';
import { Observable } from 'rxjs';
import {environment} from '../../../../shared/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class TomeService {
  private basePath = environment.serverBasePath;
  private url: string = '/tomes';
  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }


  constructor(private http: HttpClient) {}


  getByLevelId(levelId: number): Observable<Tome[]> {
    return this.http.get<Tome[]>(`${this.resourcePath()}/level/${levelId}`);
  }

}
