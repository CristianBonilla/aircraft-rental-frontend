import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  UserAccount,
  SuccessResponse,
  UserLoginRequest,
  UserRegisterRequest,
  UserResponse,
} from '@modules/auth/models/authentication';
import { Permission } from '@modules/auth/models/permission';
import { RoleRequest, RoleResponse } from '@modules/auth/models/role';
import { StorageService } from '@services/storage/storage.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { last, map, mergeAll, mergeMap, tap } from 'rxjs/operators';
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
  private readonly userAccountSubject = new BehaviorSubject<UserAccount>(null);
  userAccount$: Observable<UserAccount>;

  constructor(private http: HttpClient, private storage: StorageService) {
    this.jwtHelper = new JwtHelperService();
    this.userAccount$ = this.userAccountSubject.asObservable();
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

  refreshUser() {
    const user$ = this.userInStorage()
      .pipe(tap(userAccount => this.userAccountSubject.next(userAccount)));

    return user$;
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
    const register$ = this.http.post<SuccessResponse>(this.registerEndpointUrl, userRegisterRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    }).pipe(mergeMap(success => this.saveUser(success)));

    return register$;
  }

  userLogin(userLoginRequest: UserLoginRequest) {
    const login$ = this.http.post<SuccessResponse>(this.loginEndpointUrl, userLoginRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    }).pipe(mergeMap(success => this.saveUser(success)));

    return login$;
  }

  userLogout() {
    const logout$ = combineLatest([
      this.storage.remove(STORAGE_KEYS.USER),
      this.storage.remove(STORAGE_KEYS.USER_TOKEN)
    ]).pipe(mergeAll(), last());

    return logout$;
  }

  userExists(user: UserResponse) {
    const existingUser$ = this.http.post<boolean>(`${ this.usersEndpointUrl }/exists`, user, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return existingUser$;
  }

  createRole(roleRequest: RoleRequest) {
    const role$ = this.http.post<RoleResponse>(this.rolesEndpointUrl, roleRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return role$;
  }

  createUser(userRegisterRequest: UserRegisterRequest) {
    const user$ = this.http.post<UserResponse>(this.usersEndpointUrl, userRegisterRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    });

    return user$;
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

          return this.storage.set(STORAGE_KEYS.USER, userAccount)
            .pipe(map(() => userAccount));
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
