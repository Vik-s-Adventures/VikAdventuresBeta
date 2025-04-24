import { Injectable } from '@angular/core';
import {environment} from "../../shared/environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, retry} from "rxjs";
import {Profile} from "../model/Profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private basePath = environment.serverBasePath;
  private url: string = '/profiles';

  constructor(private http: HttpClient) {}

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * Manejo genérico de errores
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  /**
   * Crea un nuevo perfil
   * @param profile los datos del perfil a crear
   */
  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.resourcePath(), profile, this.httpOptions)
      .pipe(
        catchError(this.handleError<Profile>('createProfile'))
      );
  }

  /**
   * Obtiene el perfil por ID
   * @param profileId ID del perfil a obtener
   */
  getProfileById(profileId: number): Observable<Profile> {
    const url = `${this.resourcePath()}/${profileId}`;
    // @ts-ignore
    return this.http.get<Profile>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('getProfileById'))
      );
  }

  getProfileByUsername(username: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.resourcePath()}/by-username/${username}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<Profile>('getProfileByUsername'))
      );
  }


}
