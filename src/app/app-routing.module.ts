import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlyLoginComponent } from './component/external/fly-login/fly-login.component';
const routes: Routes = [
  { path: 'login', component: FlyLoginComponent },
  {
    path: 'home',
    loadChildren: './component/+home-page/home.module#HomeModule',
  },
  { path: '**', component: FlyLoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
