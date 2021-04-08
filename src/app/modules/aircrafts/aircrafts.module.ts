import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AircraftsRoutingModule } from '@modules/aircrafts/aircrafts-routing.module';
import { IconsModule } from '@shared/icons/icons.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

import { AircraftsComponent } from '@modules/aircrafts/aircrafts.component';

@NgModule({
  declarations: [ AircraftsComponent ],
  imports: [
    CommonModule,
    AircraftsRoutingModule,
    IconsModule,
    OverlayscrollbarsModule
  ]
})
export class AircraftsModule { }
