import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Concept } from '../models/Concept';
import { Observable } from 'rxjs';
import {environment} from '../../../../shared/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ConceptService {
  private basePath = environment.serverBasePath;
  private url: string = '/concepts';
  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }


  constructor(private http: HttpClient) {}

  getByTomeId(tomeId: number): Observable<Concept[]> {
    return this.http.get<Concept[]>(`${this.resourcePath()}/tome/${tomeId}`);
  }
}
