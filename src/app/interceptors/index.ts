import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ClassProvider } from "@angular/core";
import { AuthTokenService } from "@interceptors/auth-token/auth-token.service";

export const authTokenProvider: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenService,
  multi: true
}

export const INTERCEPTOR_PROVIDERS = [
  authTokenProvider
];
