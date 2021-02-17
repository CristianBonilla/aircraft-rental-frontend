import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthRoutingModule } from '@modules/auth/auth-routing.module';
import { AuthComponent } from '@modules/auth/auth.component';

@NgModule({
  declarations: [ AuthComponent ],
  imports: [
    CommonModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: true,
      rolesIsolate: true
    }),
    AuthRoutingModule
  ]
})
export class AuthModule { }
