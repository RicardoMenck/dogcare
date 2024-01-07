import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogsRoutingModule } from './dogs-routing.module';
import { DogDetailsComponent } from './dog-details/dog-details.component';


@NgModule({
  declarations: [
    DogDetailsComponent
  ],
  imports: [
    CommonModule,
    DogsRoutingModule
  ]
})
export class DogsModule { }
