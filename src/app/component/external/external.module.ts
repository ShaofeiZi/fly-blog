import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {WidgetModule} from '../widget/widget.module';
import {PasswordModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {FlyLoginComponent} from './fly-login/fly-login.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WidgetModule,
    TranslateModule.forChild(), PasswordModule, ButtonModule
  ],
  declarations: [FlyLoginComponent, HeaderComponent],
  exports: [FlyLoginComponent],
})
export class ExternalPageModule {
}
