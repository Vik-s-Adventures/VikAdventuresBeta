import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../shared/environments/environment.development';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import {MatchingItem} from '../model/MatchItem';
import {MatchingPair} from '../model/MatchingPair';

@Injectable({
  providedIn: 'root'
})
export class MatchingItemService {
  private basePath = environment.serverBasePath;
  private itemUrl = '/matching-items';
  private pairUrl = '/matching-pairs';
  private matchUrl = '/matches';

  constructor(private http: HttpClient) {}
  getByLevelId(levelId: number): Observable<{ items: MatchingItem[], description: string }> {
    return this.http.get<any[]>(`${this.basePath}${this.matchUrl}/trial/${levelId}`).pipe(
      map(matches => matches[0]),
      switchMap(match =>
        this.http.get<MatchingPair[]>(`${this.basePath}${this.pairUrl}/matching/${match.id}`).pipe(
          switchMap(pairs =>
            forkJoin(
              pairs.map(pair =>
                this.http.get<MatchingItem[]>(`${this.basePath}${this.itemUrl}/pair/${pair.id}`)
              )
            ).pipe(
              map(nestedItems => ({
                items: nestedItems.flat(),
                description: match.description
              }))
            )
          )
        )
      )
    );
  }

}
