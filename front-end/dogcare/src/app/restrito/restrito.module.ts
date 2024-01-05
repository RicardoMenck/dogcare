import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: DashboardComponent }]
// { path: 'detail/:id', component: ComponentDetail }]

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule],
})
export class RestritoModule {

}

