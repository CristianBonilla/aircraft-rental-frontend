import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // {
      //   path: 'roles'
      // },
      // {
      //   path: 'users'
      // },
      {
        path: 'aircrafts',
        loadChildren: () => import('@modules/aircrafts/aircrafts.module')
          .then(module => module.AircraftsModule)
      },
      // {
      //   path: 'passengers'
      // },
      {
        path: 'rentals',
        loadChildren: () => import('@modules/rentals/rentals.module')
          .then(module => module.RentalsModule)
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule { }
