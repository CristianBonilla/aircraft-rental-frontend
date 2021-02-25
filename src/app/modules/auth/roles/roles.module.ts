import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesRoutingModule } from '@modules/auth/roles/roles-routing.module';
import { IconsModule } from '@shared/icons/icons.module';
import { DropdownSelectModule } from '@shared/dropdown-select/dropdown-select.module';
import { DirectivesModule } from '@directives/directives.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { RolesComponent } from '@modules/auth/roles/roles.component';
import { CreateRoleComponent } from '@modules/auth/roles/create-role/create-role.component';

@NgModule({
  declarations: [ RolesComponent, CreateRoleComponent ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    IconsModule,
    DropdownSelectModule,
    DirectivesModule,
    NgxTrimDirectiveModule
  ]
})
export class RolesModule { }
