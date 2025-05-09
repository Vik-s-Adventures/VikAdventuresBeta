import { Injectable } from '@angular/core';
import { environment } from "../../shared/environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { Profile } from "../model/Profile";

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

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(this.resourcePath(), profile);
  }

  getProfileById(profileId: number): Observable<Profile> {
    const url = `${this.resourcePath()}/${profileId}`;
    return this.http.get<Profile>(url);
  }
  getProfileByUserId(userId: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.resourcePath()}/by-user/${userId}`);
  }



}
