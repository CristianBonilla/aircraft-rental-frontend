import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ALLOW } from '@modules/auth/models/permission';
import { HomeComponent } from '@modules/home/home.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { APP_ROUTES } from 'src/app/models/routes';

const { HOME: { MAIN: START_REDIRECT } } = APP_ROUTES;  // authorization - auth.guard

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'roles',
        canActivate: [ NgxPermissionsGuard ],
        data: {
          permissions: {
            only: ALLOW.ROLES,
            redirectTo: START_REDIRECT
          }
        },
        loadChildren: () => import('@modules/auth/roles/roles.module')
          .then(module => module.RolesModule)
      },
      {
        path: 'users',
        canActivate: [ NgxPermissionsGuard ],
        data: {
          permissions: {
            only: ALLOW.USERS,
            redirectTo: START_REDIRECT
          }
        },
        loadChildren: () => import('@modules/auth/users/users.module')
          .then(module => module.UsersModule)
      },
      {
        path: 'rentals',
        canActivate: [ NgxPermissionsGuard ],
        data: {
          permissions: {
            only: ALLOW.RENTALS,
            redirectTo: START_REDIRECT
          }
        },
        loadChildren: () => import('@modules/rentals/rentals.module')
          .then(module => module.RentalsModule)
      },
      {
        path: 'aircrafts',
        canActivate: [ NgxPermissionsGuard ],
        data: {
          permissions: {
            only: ALLOW.AIRCRAFTS,
            redirectTo: START_REDIRECT
          }
        },
        loadChildren: () => import('@modules/aircrafts/aircrafts.module')
          .then(module => module.AircraftsModule)
      },
      {
        path: 'passengers',
        canActivate: [ NgxPermissionsGuard ],
        data: {
          permissions: {
            only: ALLOW.PASSENGERS,
            redirectTo: START_REDIRECT
          }
        },
        loadChildren: () => import('@modules/passengers/passengers.module')
          .then(module => module.PassengersModule)
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule { }
