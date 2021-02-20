import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersRoutingModule } from '@modules/auth/passengers/passengers-routing.module';
import { PassengersComponent } from '@modules/auth/passengers/passengers.component';

@NgModule({
  declarations: [ PassengersComponent ],
  imports: [ CommonModule, PassengersRoutingModule ]
})
export class PassengersModule { }
