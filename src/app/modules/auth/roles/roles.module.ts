import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesRoutingModule } from '@modules/auth/roles/roles-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@shared/icons/icons.module';
import { DropdownSelectModule } from '@shared/components/dropdown-select/dropdown-select.module';
import { DirectivesModule } from '@directives/directives.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

import { RolesComponent } from '@modules/auth/roles/roles.component';
import { CreateRoleComponent } from '@modules/auth/roles/create-role/create-role.component';
import { RoleDetailsComponent } from '@modules/auth/roles/role-details/role-details.component';

@NgModule({
  declarations: [
    RolesComponent,
    CreateRoleComponent,
    RoleDetailsComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    IconsModule,
    DropdownSelectModule,
    DirectivesModule,
    NgxTrimDirectiveModule,
    OverlayscrollbarsModule
  ]
})
export class RolesModule { }
