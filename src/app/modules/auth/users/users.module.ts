import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from '@modules/auth/users/users-routing.module';
import { IconsModule } from '@shared/icons/icons.module';
import { DropdownSelectModule } from '@shared/components/dropdown-select/dropdown-select.module';
import { DirectivesModule } from '@directives/directives.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { UsersComponent } from '@modules/auth/users/users.component';
import { CreateUserComponent } from '@modules/auth/users/create-user/create-user.component';

@NgModule({
  declarations: [ UsersComponent, CreateUserComponent ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    IconsModule,
    DropdownSelectModule,
    DirectivesModule,
    NgxTrimDirectiveModule
  ]
})
export class UsersModule { }
