import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ClassProvider, LOCALE_ID, ValueProvider } from "@angular/core";
import { AuthTokenService } from "@interceptors/auth-token/auth-token.service";

export const localeIDProvider: ValueProvider = {
  provide: LOCALE_ID,
  useValue: 'es-CO'
};

export const authTokenProvider: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenService,
  multi: true
}

export const INTERCEPTOR_PROVIDERS = [
  localeIDProvider,
  authTokenProvider
];
