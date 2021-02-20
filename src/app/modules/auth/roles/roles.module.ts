import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from '@modules/auth/roles/roles-routing.module';
import { RolesComponent } from '@modules/auth/roles/roles.component';

@NgModule({
  declarations: [ RolesComponent ],
  imports: [ CommonModule, RolesRoutingModule ]
})
export class RolesModule { }
