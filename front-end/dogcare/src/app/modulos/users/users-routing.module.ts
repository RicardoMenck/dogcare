import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  { path: '', component: UserDetailsComponent },
  { path: 'new', component: UserComponent },
  { path: 'edit', component: UserComponent },
  { path: 'edit/:idUser', component: UserUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
