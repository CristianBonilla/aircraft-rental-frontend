import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('@modules/home/home.module')
          .then(module => module.HomeModule)
      },
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('@modules/auth/auth.module')
          .then(module => module.AuthModule)
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
