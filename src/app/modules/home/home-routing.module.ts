import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionType } from '@modules/auth/models/permission';
import { DefaultRoles } from '@modules/auth/models/role';
import { HomeComponent } from '@modules/home/home.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const { AdminUser } = DefaultRoles;
const {
  ROLES,
  USERS,
  AIRCRAFTS,
  PASSENGERS,
  RENTALS
} = PermissionType;

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [ NgxPermissionsGuard ],
    children: [
      {
        path: 'roles',
        // canActivate: [ NgxPermissionsGuard ],
        // data: {
        //   permissions: {
        //     only: [ AdminUser, ROLES ]
        //   }
        // },
        loadChildren: () => import('@modules/auth/roles/roles.module')
          .then(module => module.RolesModule)
      },
      {
        path: 'users',
        // canActivate: [ NgxPermissionsGuard ],
        // data: {
        //   permissions: {
        //     only: [ AdminUser, USERS ]
        //   }
        // },
        loadChildren: () => import('@modules/auth/users/users.module')
          .then(module => module.UsersModule)
      },
      {
        path: 'rentals',
        // canActivate: [ NgxPermissionsGuard ],
        // data: {
        //   permissions: {
        //     only: [ AdminUser, RENTALS ]
        //   }
        // },
        loadChildren: () => import('@modules/rentals/rentals.module')
          .then(module => module.RentalsModule)
      },
      {
        path: 'aircrafts',
        // canActivate: [ NgxPermissionsGuard ],
        // data: {
        //   permissions: {
        //     only: [ AdminUser, AIRCRAFTS ]
        //   }
        // },
        loadChildren: () => import('@modules/aircrafts/aircrafts.module')
          .then(module => module.AircraftsModule)
      },
      {
        path: 'passengers',
        // canActivate: [ NgxPermissionsGuard ],
        // data: {
        //   permissions: {
        //     only: [ AdminUser, PASSENGERS ]
        //   }
        // },
        loadChildren: () => import('@modules/auth/passengers/passengers.module')
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
