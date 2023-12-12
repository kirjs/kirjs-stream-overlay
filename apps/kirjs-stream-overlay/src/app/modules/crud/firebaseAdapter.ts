import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mapTo, take, tap } from 'rxjs/operators';
import { CrudAdapter } from './crud.module';

@Injectable()
export class FirebaseAdapter<T extends { key: string }>
  implements CrudAdapter<T>
{
  key = 0;

  private readonly list$ = new BehaviorSubject<T[]>([
    {
      key: this.nextKey(),
      name: 'lis',
      highlights: '1234',
    },
    {
      key: this.nextKey(),
      name: 'kirjs',
      highlights: '1234',
    },
  ] as any);

  constructor() {}

  nextKey() {
    return (this.key++).toString();
  }

  create(t: T): Observable<T> {
    return this.list$.pipe(
      take(1),
      map(list => [...list, { ...t, key: this.nextKey() }]),
      tap(list => {
        this.list$.next(list);
      }),
      mapTo(t),
    );
  }

  delete(t: T): Observable<void> {
    this.list$
      .pipe(
        take(1),
        tap(list => {
          const value = list.filter(i => i.key !== t.key);
          this.list$.next(value);
        }),
        mapTo(undefined),
      )
      .subscribe();
    return of();
  }

  list(): Observable<T[]> {
    return this.list$;
  }

  update(t: T): Observable<T> {
    this.list$
      .pipe(
        take(1),
        tap(list => {
          const value = list.map(i => (i.key === t.key ? t : i));
          this.list$.next(value);
        }),
        mapTo(undefined),
      )
      .subscribe();

    return of(t);
  }

  get(key: string): Observable<T | undefined> {
    return this.list$.pipe(
      map(list => {
        return list.find(i => i.key === key);
      }),
    );
  }
}
