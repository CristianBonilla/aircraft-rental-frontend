import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  UserAccount,
  SuccessResponse,
  UserLoginRequest,
  UserRegisterRequest,
  UserResponse,
  FailedResponse
} from '@modules/auth/models/authentication';
import { Permission } from '@modules/auth/models/permission';
import { RoleRequest, RoleResponse } from '@modules/auth/models/role';
import { AuthorizationService } from '@services/authorization/authorization.service';
import { StorageService } from '@services/storage/storage.service';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, delay, filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { ENDPOINTS } from 'src/app/models/endpoints';
import { STORAGE_KEYS } from 'src/app/models/storage-keys';

const {
  AUTH: {
    REGISTER,
    LOGIN,
    USERS,
    ROLES
  }
} = ENDPOINTS;

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private readonly httpHeaderOptions: HttpHeaders;
  private readonly registerEndpointUrl = REGISTER;
  private readonly loginEndpointUrl = LOGIN;
  private readonly usersEndpointUrl = USERS;
  private readonly rolesEndpointUrl = ROLES;
  private readonly jwtHelper: JwtHelperService;
  private readonly loadingSubject = new Subject<boolean>();
  private readonly userAccountSubject = new BehaviorSubject<UserAccount>(null);
  loading$: Observable<boolean>;
  userAccount$: Observable<UserAccount>;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private authorization: AuthorizationService) {
    this.jwtHelper = new JwtHelperService();
    this.loading$ = this.loadingSubject.asObservable();
    this.userAccount$ = this.userAccountSubject.asObservable();
    this.userInStorage().pipe(
      filter(userAccount => !!userAccount),
      take(1))
    .subscribe(userAccount => {
      this.userAccountSubject.next(userAccount);
      this.authorization.loadRoleAndPermissions(userAccount);
    });
  }

  isAuthenticated() {
    const authenticated$ = combineLatest([
      this.tokenInStorage(),
      this.userInStorage()
    ]).pipe(
      map(([ token, userAccount ]) => {
        const hasToken = !!token && !!token.trim() && !this.jwtHelper.isTokenExpired(token);

        return hasToken && !!userAccount;
      })
    );

    return authenticated$;
  }

  tokenInStorage() {
    const token$ = this.getInStorage<string>(STORAGE_KEYS.USER_TOKEN);

    return token$;
  }

  userInStorage() {
    const user$ = this.getInStorage<UserAccount>(STORAGE_KEYS.USER);

    return user$;
  }

  userRegister(userRegisterRequest: UserRegisterRequest) {
    this.loadingSubject.next(true);
    const register$ = this.http.post<SuccessResponse>(this.registerEndpointUrl, userRegisterRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    }).pipe(
      mergeMap(success => this.saveUser(success)),
      catchError(({ error }: HttpErrorResponse) => {
        const errors: FailedResponse = { errors: error?.errors ?? []  };
        this.loadingSubject.next(false);

        return of(errors);
      })
    );

    return register$;
  }

  userLogin(userLoginRequest: UserLoginRequest) {
    this.loadingSubject.next(true);
    const login$ = this.http.post<SuccessResponse>(this.loginEndpointUrl, userLoginRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    }).pipe(
      mergeMap(success => this.saveUser(success)),
      catchError(({ error }: HttpErrorResponse) => {
        const errors: FailedResponse = { errors: error?.errors ?? []  };
        this.loadingSubject.next(false);

        return of(errors);
      })
    );

    return login$;
  }

  userLogout() {
    this.loadingSubject.next(true);
    const logout$ = combineLatest([
      this.storage.remove(STORAGE_KEYS.USER),
      this.storage.remove(STORAGE_KEYS.USER_TOKEN)
    ]).pipe(
      delay(3000),
      tap(() => {
        this.userAccountSubject.next(null);
        this.authorization.removeRoleAndPermissions();
        this.loadingSubject.next(false);
      })
    );

    return logout$;
  }

  createRole(roleRequest: RoleRequest) {
    const role$ = this.http.post<RoleResponse>(this.rolesEndpointUrl, roleRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return role$;
  }

  fetchRoleById(roleId: number) {
    const role$ = this.http.get<RoleResponse>(`${ this.rolesEndpointUrl }/${ roleId }`, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return role$;
  }

  fetchUserById(userId: number) {
    const user$ = this.http.get<UserResponse>(`${ this.usersEndpointUrl }/${ userId }`, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return user$;
  }

  fetchRoles() {
    const roles$ = this.http.get<RoleResponse[]>(this.rolesEndpointUrl, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return roles$;
  }

  fetchUsers() {
    const users$ = this.http.get<UserResponse[]>(this.usersEndpointUrl, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return users$;
  }

  fetchPermissionsByRole(roleId: number) {
    const permissions$ = this.http.get<Permission[]>(`${ this.rolesEndpointUrl }/${ roleId }/permissions`, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return permissions$;
  }

  private saveUser({ token, user, role, permissions }: SuccessResponse) {
    const authenticatedUser$ = this.storage.set(STORAGE_KEYS.USER_TOKEN, token)
      .pipe(
        mergeMap(() => {
          const userAccount: UserAccount = {
            user, role: { ...role, permissions: [ ...permissions ] }
          };
          this.userAccountSubject.next(userAccount);

          return this.storage.set(STORAGE_KEYS.USER, userAccount);
        }),
        tap(() => {
          const userAccount = this.userAccountSubject.getValue();
          this.authorization.loadRoleAndPermissions(userAccount);
          this.loadingSubject.next(false);
        })
      );

    return authenticatedUser$;
  }

  private getInStorage<T>(storageKey: STORAGE_KEYS) {
    const inStorage$ = this.storage.get<T>(storageKey)
      .pipe(map<object, T>(source => source[storageKey] ?? null));

    return inStorage$;
  }
}
