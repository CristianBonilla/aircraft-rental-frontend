import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from '@modules/auth/users/users-routing.module';
import { UsersComponent } from '@modules/auth/users/users.component';

@NgModule({
  declarations: [ UsersComponent ],
  imports: [ CommonModule, UsersRoutingModule ]
})
export class UsersModule { }
