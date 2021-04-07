import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '@modules/auth/users/users.component';
import { CreateUserComponent } from '@modules/auth/users/create-user/create-user.component';
import { UserDetailsComponent } from '@modules/auth/users/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'create',
        component: CreateUserComponent
      },
      {
        path: 'details/:userId',
        component: UserDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule { }
