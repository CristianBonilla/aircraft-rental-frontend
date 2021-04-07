import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from '@modules/auth/users/users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@shared/icons/icons.module';
import { DropdownSelectModule } from '@shared/components/dropdown-select/dropdown-select.module';
import { DirectivesModule } from '@directives/directives.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { UsersComponent } from '@modules/auth/users/users.component';
import { CreateUserComponent } from '@modules/auth/users/create-user/create-user.component';
import { UserDetailsComponent } from '@modules/auth/users/user-details/user-details.component';

import { UsersWithRolePipe } from '@modules/auth/users/pipes/users-with-role/users-with-role.pipe';

@NgModule({
  declarations: [
    UsersComponent,
    CreateUserComponent,
    UserDetailsComponent,
    UsersWithRolePipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    IconsModule,
    DropdownSelectModule,
    DirectivesModule,
    NgxTrimDirectiveModule
  ]
})
export class UsersModule { }
