import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { ToggleButtonModule } from 'primeng/primeng';
import { HomePageRoutingModule } from './home-page.routes';
import { FlyHomeComponent } from './fly-home/fly-home.component';
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HomePageRoutingModule,
        TranslateModule.forChild(), ToggleButtonModule],
    declarations: [FlyHomeComponent],
    exports: [FlyHomeComponent],
})
export class HomeModule {
}
