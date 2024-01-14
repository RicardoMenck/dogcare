import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DogServicesRoutingModule } from './dog-services-routing.module';
import { DogServicesComponent } from './dog-services/dog-services.component';
import { DogServicesDetailsComponent } from './dog-services-details/dog-services-details.component';

@NgModule({
  declarations: [DogServicesComponent, DogServicesDetailsComponent],
  imports: [CommonModule, DogServicesRoutingModule, ReactiveFormsModule],
})
export class DogServicesModule {}
