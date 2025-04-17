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
  basePath = environment.serverBasePath;
  url: string = '/authentication';

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  constructor(private http: HttpClient) {}

  signUp(user: SignUpUser): Observable<any> {
    return this.http.post(`${this.resourcePath()}/sign-up`, user, {
      withCredentials: true, // Habilitar envío de credenciales
    });
  }

  signIn(credentials: SignInUser): Observable<any> {
    return this.http.post(`${this.resourcePath()}/sign-in`, credentials);
  }

}
