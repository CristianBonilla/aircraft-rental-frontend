import { Observable } from 'rxjs';

export interface Refresh<T> {
  readonly loading$: Observable<boolean>;
  readonly data$: Observable<T>;

  dispatch: () => void;
}
