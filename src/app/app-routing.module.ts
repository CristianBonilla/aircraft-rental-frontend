import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('@modules/home/home.module')
          .then(module => module.HomeModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('@modules/auth/auth.module')
          .then(module => module.AuthModule)
      },
      {
        path: 'aircrafts',
        loadChildren: () => import('@modules/aircrafts/aircrafts.module')
          .then(module => module.AircraftsModule)
      },
      {
        path: 'rentals',
        loadChildren: () => import('@modules/rentals/rentals.module')
          .then(module => module.RentalsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
