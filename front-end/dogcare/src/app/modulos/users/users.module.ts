import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserUpdateComponent } from './user-update/user-update.component';

@NgModule({
  declarations: [UserDetailsComponent, UserUpdateComponent],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule],
})
export class UsersModule {}
