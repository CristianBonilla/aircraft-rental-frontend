import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersRoutingModule } from '@modules/passengers/passengers-routing.module';
import { PassengersComponent } from '@modules/passengers/passengers.component';
import { IconsModule } from '@shared/icons/icons.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

@NgModule({
  declarations: [ PassengersComponent ],
  imports: [
    CommonModule,
    PassengersRoutingModule,
    IconsModule,
    OverlayscrollbarsModule
  ]
})
export class PassengersModule { }
