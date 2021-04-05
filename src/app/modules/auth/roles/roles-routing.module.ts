import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from '@modules/auth/roles/roles.component';
import { CreateRoleComponent } from '@modules/auth/roles/create-role/create-role.component';
import { RoleDetailsComponent } from '@modules/auth/roles/role-details/role-details.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    children: [
      {
        path: 'create',
        component: CreateRoleComponent
      },
      {
        path: 'details/:roleId',
        component: RoleDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RolesRoutingModule { }
