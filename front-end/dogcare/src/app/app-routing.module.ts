import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { RestritoModule } from './restrito/restrito.module';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DogComponent } from './modulos/dogs/dog/dog.component';
import { PhotosComponent } from './components/photos/photos.component';
import { ServicosComponent } from './components/servicos/servicos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { autorizadoGuard } from './_guard/autorizado.guard';
import { DogDetailsComponent } from './modulos/dogs/dog-details/dog-details.component';
import { DogServicesComponent } from './modulos/dog-services/dog-services/dog-services.component';
import { UserComponent } from './modulos/users/user/user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  {
    path: 'dogs',
    component: DogDetailsComponent,
    canActivate: [autorizadoGuard],
  },
  { path: 'dogs/new', component: DogComponent, canActivate: [autorizadoGuard] },
  {
    path: 'dogs/:id',
    component: DogDetailsComponent,
    canActivate: [autorizadoGuard],
  },
  {
    path: 'dogs/:id/edit',
    component: DogDetailsComponent,
    canActivate: [autorizadoGuard],
  },
  { path: 'users', component: UserComponent, canActivate: [autorizadoGuard] },
  {
    path: 'users/:id',
    component: UserComponent,
    canActivate: [autorizadoGuard],
  },
  {
    path: 'users/:id/edit',
    component: UserComponent,
    canActivate: [autorizadoGuard],
  },
  {
    path: 'services',
    component: DogServicesComponent,
    canActivate: [autorizadoGuard],
  },
  {
    path: 'services/:id',
    component: DogServicesComponent,
    canActivate: [autorizadoGuard],
  },
  {
    path: 'services/:id/edit',
    component: DogServicesComponent,
    canActivate: [autorizadoGuard],
  },

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
  {
    path: 'restrito',
    loadChildren: () =>
      import('./restrito/restrito.module').then((mod) => mod.RestritoModule),
  },
  {
    path: 'dogs',
    loadChildren: () =>
      import('./modulos/dogs/dogs.module').then((mod) => mod.DogsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
