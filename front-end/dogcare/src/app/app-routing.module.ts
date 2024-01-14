import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DogComponent } from './modulos/dogs/dog/dog.component';
import { ServicosComponent } from './components/servicos/servicos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { autorizadoGuard } from './_guard/autorizado.guard';
import { DogDetailsComponent } from './modulos/dogs/dog-details/dog-details.component';
import { DogServicesComponent } from './modulos/dog-services/dog-services/dog-services.component';
import { UserComponent } from './modulos/users/user/user.component';
import { UserDetailsComponent } from './modulos/users/user-details/user-details.component';
import { UserUpdateComponent } from './modulos/users/user-update/user-update.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'servicos', component: ServicosComponent },
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
    path: 'dogs/edit/:idDog',
    component: DogComponent,
    canActivate: [autorizadoGuard],
  },
  {
    path: 'users',
    component: UserDetailsComponent,
    canActivate: [autorizadoGuard],
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    canActivate: [autorizadoGuard],
  },
  {
    path: 'users/edit',
    component: UserUpdateComponent,
    canActivate: [autorizadoGuard],
  },
  {
    path: 'users/edit/:idUser',
    component: UserUpdateComponent,
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
    path: 'services/edit/:id',
    component: DogServicesComponent,
    canActivate: [autorizadoGuard],
  },

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
  {
    path: 'dogs',
    loadChildren: () =>
      import('./modulos/dogs/dogs.module').then((mod) => mod.DogsModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modulos/users/users.module').then((mod) => mod.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
