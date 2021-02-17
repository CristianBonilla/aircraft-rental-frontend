import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse, UserLoginRequest, UserRegisterRequest, UserResponse } from '@modules/auth/models/authentication';
import { Permission } from '@modules/auth/models/permission';
import { RoleRequest, RoleResponse } from '@modules/auth/models/role';
import { StorageService } from '@services/storage/storage.service';
import { map } from 'rxjs/operators';
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

  constructor(private http: HttpClient, private storage: StorageService) { }

  userRegister(userRegisterRequest: UserRegisterRequest) {
    const register$ = this.http.post<SuccessResponse>(this.registerEndpointUrl, userRegisterRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    }).pipe(map(success => this.storage.set(STORAGE_KEYS.USER_TOKEN, success.token)));

    return register$;
  }

  userLogin(userLoginRequest: UserLoginRequest) {
    const login$ = this.http.post<SuccessResponse>(this.loginEndpointUrl, userLoginRequest, {
      responseType: 'json',
      ...this.httpHeaderOptions
    }).pipe(map(success => this.storage.set(STORAGE_KEYS.USER_TOKEN, success.token)));

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
}
