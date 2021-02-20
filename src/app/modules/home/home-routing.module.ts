import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'roles',
        loadChildren: () => import('@modules/auth/roles/roles.module')
          .then(module => module.RolesModule)
      },
      {
        path: 'users',
        loadChildren: () => import('@modules/auth/users/users.module')
          .then(module => module.UsersModule)
      },
      {
        path: 'aircrafts',
        loadChildren: () => import('@modules/aircrafts/aircrafts.module')
          .then(module => module.AircraftsModule)
      },
      {
        path: 'passengers',
        loadChildren: () => import('@modules/auth/passengers/passengers.module')
          .then(module => module.PassengersModule)
      },
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
