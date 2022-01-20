import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mapTo, take, tap } from 'rxjs/operators';
import { CrudAdapter } from './crud.module';

@Injectable()
export class FirebaseAdapter<T extends { key: string }>
  implements CrudAdapter<T>
{
  private readonly list$ = new BehaviorSubject<T[]>([
    {
      key: '123',
      name: 'lis',
      highlights: '1234',
    },
    {
      key: '125',
      name: 'kirjs',
      highlights: '1234',
    },
  ] as any);

  constructor() {}

  create(t: T): Observable<T> {
    return of({} as T);
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
    return of({} as T);
  }
}
