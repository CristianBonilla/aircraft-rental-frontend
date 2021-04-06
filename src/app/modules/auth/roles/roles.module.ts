import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesRoutingModule } from '@modules/auth/roles/roles-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@shared/icons/icons.module';
import { DropdownSelectModule } from '@shared/components/dropdown-select/dropdown-select.module';
import { DirectivesModule } from '@directives/directives.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { RolesComponent } from '@modules/auth/roles/roles.component';
import { CreateRoleComponent } from '@modules/auth/roles/create-role/create-role.component';
import { RoleDetailsComponent } from '@modules/auth/roles/role-details/role-details.component';

import { RoleWithPermissionsPipe } from '@modules/auth/roles/pipes/role-with-permissions/role-with-permissions.pipe';

@NgModule({
  declarations: [
    RolesComponent,
    CreateRoleComponent,
    RoleDetailsComponent,
    RoleWithPermissionsPipe
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    IconsModule,
    DropdownSelectModule,
    DirectivesModule,
    NgxTrimDirectiveModule
  ]
})
export class RolesModule { }
