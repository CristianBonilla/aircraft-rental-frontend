import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersRoutingModule } from '@modules/passengers/passengers-routing.module';
import { PassengersComponent } from '@modules/passengers/passengers.component';

@NgModule({
  declarations: [ PassengersComponent ],
  imports: [ CommonModule, PassengersRoutingModule ]
})
export class PassengersModule { }
