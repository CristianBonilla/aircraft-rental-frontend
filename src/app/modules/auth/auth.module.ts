import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '@modules/auth/auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@shared/icons/icons.module';
import { DirectivesModule } from '@directives/directives.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { ThemeToggleModule } from '@shared/components/theme-toggle/theme-toggle.module';

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
    AuthRoutingModule,
    ReactiveFormsModule,
    IconsModule,
    DirectivesModule,
    NgxTrimDirectiveModule,
    OverlayscrollbarsModule,
    ThemeToggleModule
  ]
})
export class AuthModule { }
