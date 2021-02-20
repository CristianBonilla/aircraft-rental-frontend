import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '@modules/auth/auth-routing.module';
import { IconsModule } from '@shared/icons/icons.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { AuthComponent } from '@modules/auth/auth.component';
import { LoginComponent } from '@modules/auth/login/login.component';
import { RegisterComponent } from '@modules/auth/register/register.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    IconsModule,
    NgxTrimDirectiveModule
  ]
})
export class AuthModule { }
