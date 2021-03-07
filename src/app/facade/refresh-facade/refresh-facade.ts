import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Refresh } from '@facade/refresh-facade';

export class RefreshFacade<T> implements Refresh<T> {
  private readonly loadingSubject = new Subject<boolean>();
  private readonly dataSubject = new Subject<T>();
  readonly loading$: Observable<boolean>;
  readonly data$: Observable<T>;

  constructor(private source$: Observable<T>) {
    this.loading$ = this.loadingSubject.asObservable();
    this.data$ = this.dataSubject.asObservable();
  }

  dispatch() {
    this.loadingSubject.next(true);
    this.source$.pipe(take(1))
      .subscribe(data => {
        this.dataSubject.next(data);
        this.loadingSubject.next(false);
      });
  }
}
