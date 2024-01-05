import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { RestritoModule } from './restrito/restrito.module';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DogComponent } from './components/dog/dog.component';
import { PhotosComponent } from './components/photos/photos.component';
import { ServicosComponent } from './components/servicos/servicos.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GuardRestritoService } from './guard-restrito.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  { path: 'menu', component: MenuComponent },
  { path: 'dog', component: DogComponent },

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'restrito',
    canActivate: [GuardRestritoService],
    loadChildren: () =>
      import('./restrito/restrito.module').then((mod) => mod.RestritoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
