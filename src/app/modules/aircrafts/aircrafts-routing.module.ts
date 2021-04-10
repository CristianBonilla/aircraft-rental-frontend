import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AircraftsComponent } from '@modules/aircrafts/aircrafts.component';
import { CreateAircraftComponent } from '@modules/aircrafts/create-aircraft/create-aircraft.component';
import { AircraftDetailsComponent } from '@modules/aircrafts/aircraft-details/aircraft-details.component';
import { UpdateAircraftComponent } from '@modules/aircrafts/update-aircraft/update-aircraft.component';
import { DeleteAircraftComponent } from '@modules/aircrafts/delete-aircraft/delete-aircraft.component';

const routes: Routes = [
  {
    path: '',
    component: AircraftsComponent,
    children: [
      {
        path: 'create',
        component: CreateAircraftComponent
      },
      {
        path: 'details/:aircraftId',
        component: AircraftDetailsComponent
      },
      {
        path: 'update/:aircraftId',
        component: UpdateAircraftComponent
      },
      {
        path: 'delete/:aircraftId',
        component: DeleteAircraftComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AircraftsRoutingModule { }
