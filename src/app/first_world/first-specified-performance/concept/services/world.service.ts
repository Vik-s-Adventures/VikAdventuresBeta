import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {World} from '../models/World';
import {environment} from '../../../../shared/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class WorldService {
  private basePath = environment.serverBasePath;
  private url: string = '/worlds';
  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }


  constructor(private http: HttpClient) {}

  getAll(): Observable<World[]> {
    return this.http.get<World[]>(this.resourcePath());
  }

  getById(id: number): Observable<World> {
    return this.http.get<World>(`${this.resourcePath()}/${id}`);
  }
}


