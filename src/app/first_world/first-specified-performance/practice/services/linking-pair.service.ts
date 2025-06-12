import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LinkingPair} from '../model/LinkingPair';
import {map, Observable, switchMap} from 'rxjs';
import {environment} from '../../../../shared/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LinkingPairService {
  private basePath = environment.serverBasePath;
  private linksUrl = '/links';
  private pairsUrl = '/linking-pairs';

  constructor(private http: HttpClient) {}

  getByLevelId(levelId: number): Observable<{ items: LinkingPair[], description: string }> {
    return this.http.get<any[]>(`${this.basePath}${this.linksUrl}/trial/${levelId}`).pipe(
      map(linkings => linkings[0]),
      switchMap(linking =>
        this.http.get<LinkingPair[]>(`${this.basePath}${this.pairsUrl}/linking/${linking.id}`).pipe(
          map(items => ({
            items,
            description: linking.description
          }))
        )
      )
    );
  }
}
