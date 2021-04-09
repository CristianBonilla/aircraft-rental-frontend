import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AircraftsComponent } from '@modules/aircrafts/aircrafts.component';
import { CreateAircraftComponent } from '@modules/aircrafts/create-aircraft/create-aircraft.component';

const routes: Routes = [
  {
    path: '',
    component: AircraftsComponent,
    children: [
      {
        path: 'create',
        component: CreateAircraftComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AircraftsRoutingModule { }
