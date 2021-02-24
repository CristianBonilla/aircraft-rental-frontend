import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HomeRoutingModule } from '@modules/home/home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@shared/icons/icons.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from '@directives/directives.module';

import { FooterComponent } from '@modules/home/footer/footer.component';
import { NavbarComponent } from '@modules/home/navbar/navbar.component';
import { SidebarComponent } from '@modules/home/sidebar/sidebar.component';
import { SidebarWrapperComponent } from '@modules/home/sidebar/sidebar-wrapper/sidebar-wrapper.component';
import { HomeComponent } from '@modules/home/home.component';

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
    HomeRoutingModule,
    NgxPermissionsModule.forChild(),
    ReactiveFormsModule,
    IconsModule,
    NgbModule,
    DirectivesModule
  ]
})
export class HomeModule { }
