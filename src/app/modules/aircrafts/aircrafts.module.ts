import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AircraftsRoutingModule } from '@modules/aircrafts/aircrafts-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: true,
      rolesIsolate: true
    }),
    AircraftsRoutingModule
  ]
})
export class AircraftsModule { }
