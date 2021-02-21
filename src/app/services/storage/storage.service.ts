import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { STORAGE_KEYS } from 'src/app/models/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  get<T>(storageKey: STORAGE_KEYS) {
    const value = localStorage.getItem(storageKey);
    const storageValue$ = of(value).pipe(
      map<string, { [x: string]: string | T }>(value => {
        try {
          return { [storageKey]: JSON.parse(value) };
        } catch {
          return { [storageKey]: value };
        }
      })
    );

    return storageValue$;
  }

  set<T>(storageKey: STORAGE_KEYS, source: T) {
    const setStorageValue$ = of(source).pipe(
      map(value => typeof value === 'object' ? JSON.stringify(value) : value.toString()),
      mergeMap(value => of(localStorage.setItem(storageKey, value)))
    );

    return setStorageValue$;
  }

  remove(storageKey: STORAGE_KEYS) {
    const removeStorageValue$ = of(localStorage.removeItem(storageKey));

    return removeStorageValue$;
  }
}
