
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FlyHomeComponent } from './fly-home/fly-home.component';


const routes: Routes = [


	{
		path: '',
		component: FlyHomeComponent,
	}
];


@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class HomePageRoutingModule {
}
