import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogServicesRoutingModule } from './dog-services-routing.module';
import { DogServicesComponent } from './dog-services/dog-services.component';


@NgModule({
  declarations: [
    DogServicesComponent
  ],
  imports: [
    CommonModule,
    DogServicesRoutingModule
  ]
})
export class DogServicesModule { }
