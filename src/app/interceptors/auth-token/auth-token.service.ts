import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage/storage.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ENDPOINTS } from 'src/app/models/endpoints';
import { STORAGE_KEYS } from 'src/app/models/storage-keys';

const {
  AUTH: {
    REGISTER,
    LOGIN
  }
} = ENDPOINTS;

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService implements HttpInterceptor {
  private readonly blackList = [
    REGISTER,
    LOGIN
  ];

  constructor(private storage: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const intercept$ = of(request).pipe(
      switchMap(request => this.getRequest(request)),
      switchMap(next.handle));

    return intercept$;
  }

  private getRequest(request: HttpRequest<any>) {
    const request$ = this.blackList.some(black => black === request.url) ? of(request) : this.authRequestHeader(request);

    return request$;
  }

  private authRequestHeader(request: HttpRequest<any>) {
    const requestHeader$ = this.storage.get<string>(STORAGE_KEYS.USER_TOKEN).pipe(
      map(token => !!token ? request.clone(this.getHeaders(token)) : request)
    );

    return requestHeader$;
  }

  private getHeaders(token: string) {
    const headers: Pick<ReturnType<HttpRequest<any>['clone']>, 'headers'> = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${ token }`
      })
    };

    return headers;
  }
}
