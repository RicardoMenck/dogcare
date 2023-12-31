import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SobreComponent } from './sobre/sobre.component';
import { RestritoModule } from './restrito/restrito.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sobre', component: SobreComponent },
  {
    path: 'restrito',
    loadChildren: () =>
      import('./restrito/restrito.module').then((mod) => mod.RestritoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
