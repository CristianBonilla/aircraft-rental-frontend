import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengersComponent } from '@modules/passengers/passengers.component';
import { CreatePassengerComponent } from '@modules/passengers/create-passenger/create-passenger.component';
import { PassengerDetailsComponent } from '@modules/passengers/passenger-details/passenger-details.component';

const routes: Routes = [
  {
    path: '',
    component: PassengersComponent,
    children: [
      {
        path: 'create',
        component: CreatePassengerComponent
      },
      {
        path: 'details/:passengerId',
        component: PassengerDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PassengersRoutingModule { }
