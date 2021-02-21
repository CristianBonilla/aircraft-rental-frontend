import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  UserAccount,
  SuccessResponse,
  UserLoginRequest,
  UserRegisterRequest,
  UserResponse
} from '@modules/auth/models/authentication';
import { Permission } from '@modules/auth/models/permission';
import { RoleRequest, RoleResponse } from '@modules/auth/models/role';
import { StorageService } from '@services/storage/storage.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
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
export class AuthService {
  private readonly httpHeaderOptions: HttpHeaders;
  private readonly registerEndpointUrl = REGISTER;
  private readonly loginEndpointUrl = LOGIN;
  private readonly usersEndpointUrl = USERS;
  private readonly rolesEndpointUrl = ROLES;
  private readonly jwtHelper: JwtHelperService;
  private readonly authLoadingSubject = new Subject<boolean>();
  private readonly userAccountSubject = new BehaviorSubject<UserAccount>(null);
  loading$: Observable<boolean>;
  userAccount$: Observable<UserAccount>;

  constructor(private http: HttpClient, private storage: StorageService) {
    this.jwtHelper = new JwtHelperService();
    this.loading$ = this.authLoadingSubject.asObservable();
    this.userAccount$ = this.userAccountSubject.asObservable();
    this.userInStorage()
      .pipe(take(1))
      .subscribe(userAccount => this.userAccountSubject.next(userAccount));
  }

  get userAccount() {
    return this.userAccountSubject.getValue();
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
    this.authLoadingSubject.next(true);
    const register$ = this.http.post<SuccessResponse>(this.registerEndpointUrl, userRegisterRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    }).pipe(
      mergeMap(success => this.saveUser(success)),
      tap(_ => this.authLoadingSubject.next(false))
    );

    return register$;
  }

  userLogin(userLoginRequest: UserLoginRequest) {
    this.authLoadingSubject.next(true);
    const login$ = this.http.post<SuccessResponse>(this.loginEndpointUrl, userLoginRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    }).pipe(
      mergeMap(success => this.saveUser(success)),
      tap(_ => this.authLoadingSubject.next(false))
    );

    return login$;
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
          this.userAccountSubject.next({
            user, role: { ...role, permissions: [ ...permissions ] }
          });

          return this.storage.set(STORAGE_KEYS.USER, this.userAccount);
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
