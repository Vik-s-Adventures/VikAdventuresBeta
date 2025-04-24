import { Injectable } from '@angular/core';
import {environment} from '../../shared/environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SignUpUser} from '../model/SignUpUser';
import {SignInUser} from '../model/SignInUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private basePath = environment.serverBasePath;
  private url = '/authentication';

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  constructor(private http: HttpClient) {}

  signUp(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.resourcePath()}/sign-up`, user);
  }

  signIn(credentials: SignInUser): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.resourcePath()}/sign-in`, credentials);
  }



}
