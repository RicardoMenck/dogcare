import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DogServicesComponent } from './dog-services/dog-services.component';
import { DogServicesDetailsComponent } from './dog-services-details/dog-services-details.component';

const routes: Routes = [
  { path: '', component: DogServicesDetailsComponent },
  { path: 'new', component: DogServicesComponent },
  { path: 'edit/:idDog', component: DogServicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogServicesRoutingModule {}
