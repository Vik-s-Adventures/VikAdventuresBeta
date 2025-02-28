import { Injectable } from '@angular/core';
import {environment} from '../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  basePath = environment.serverBasePath;
  url: string = '/users';

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(this.resourcePath());
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.resourcePath()}/${userId}`);
  }

  updateUser(userId: number, user: any): Observable<any> {
    return this.http.put(`${this.resourcePath()}/${userId}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/${userId}`);
  }
}
