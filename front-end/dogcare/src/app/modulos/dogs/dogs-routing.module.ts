import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogDetailsComponent } from './dog-details/dog-details.component';
import { DogComponent } from './dog/dog.component';

const routes: Routes = [
  { path: '', component: DogDetailsComponent },
  { path: 'new', component: DogComponent },
  { path: 'edit/:idDog', component: DogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogsRoutingModule {}
