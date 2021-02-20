import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HomeRoutingModule } from '@modules/home/home-routing.module';
import { IconsModule } from '@shared/icons/icons.module';

import { FooterComponent } from '@modules/home/footer/footer.component';
import { NavbarComponent } from '@modules/home/navbar/navbar.component';
import { SidebarComponent } from '@modules/home/sidebar/sidebar.component';
import { SidebarWrapperComponent } from '@modules/home/sidebar/sidebar-wrapper/sidebar-wrapper.component';
import { HomeComponent } from '@modules/home/home.component';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarWrapperComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: true,
      rolesIsolate: true
    }),
    HomeRoutingModule,
    IconsModule,
    DirectivesModule
  ],
  providers: []
})
export class HomeModule { }
