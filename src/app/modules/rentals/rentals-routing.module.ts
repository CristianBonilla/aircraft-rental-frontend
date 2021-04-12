import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalsComponent } from '@modules/rentals/rentals.component';
import { RentalDetailsComponent } from '@modules/rentals/rental-details/rental-details.component';

const routes: Routes = [
  {
    path: '',
    component: RentalsComponent,
    children: [
      {
        path: 'details/:aircraftId',
        component: RentalDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RentalsRoutingModule { }
