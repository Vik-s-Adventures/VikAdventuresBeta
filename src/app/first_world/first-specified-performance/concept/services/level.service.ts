import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Level} from '../models/Level';
import {environment} from '../../../../shared/environments/environment.development';
import {Tome} from '../models/Tome';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private basePath = environment.serverBasePath;
  private url: string = '/levels';
  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }


  constructor(private http: HttpClient) {}

  getAll(): Observable<Level[]> {
    return this.http.get<Level[]>(this.resourcePath());
  }

  getById(id: number): Observable<Level> {
    return this.http.get<Level>(`${this.resourcePath()}/${id}`);
  }

  getByWorldId(worldId: number): Observable<Level[]> {
    return this.http.get<Level[]>(`${this.resourcePath()}/world/${worldId}`);
  }
}

