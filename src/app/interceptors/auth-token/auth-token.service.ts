import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ENDPOINTS } from 'src/app/models/endpoints';

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

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const intercept$ = of(request).pipe(
      mergeMap(request => this.getRequest(request)),
      mergeMap(request => next.handle(request))
    );

    return intercept$;
  }

  private getRequest(request: HttpRequest<any>) {
    const request$ = this.blackList.some(black => black === request.url) ? of(request) : this.authRequestHeader(request);

    return request$;
  }

  private authRequestHeader(request: HttpRequest<any>) {
    const requestHeader$ = this.authService.tokenInStorage().pipe(
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
