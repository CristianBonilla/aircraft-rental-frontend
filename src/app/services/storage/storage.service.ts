import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { STORAGE_KEYS } from 'src/app/models/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  get<T>(storageKey: STORAGE_KEYS) {
    const value = localStorage.getItem(storageKey);
    const storageValue$ = from(value).pipe(
      map<string, T>(value => {
        try {
          return JSON.parse(value);
        } catch (error) {
          throw new TypeError(`Conversion error ${ error.message }`);
        }
      }));

    return storageValue$;
  }

  set<T>(storageKey: STORAGE_KEYS, source: T) {
    const setStorageValue$ = of(source).pipe(
      map(value => typeof value === 'object' ? JSON.stringify(value) : value.toString()),
      switchMap(value => of(localStorage.setItem(storageKey, value)))
    );

    return setStorageValue$;
  }

  remove(storageKey: STORAGE_KEYS) {
    const removeStorageValue$ = of(localStorage.removeItem(storageKey));

    return removeStorageValue$;
  }
}
