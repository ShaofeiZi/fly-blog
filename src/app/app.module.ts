import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';

/**
 * i18n
 */
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ExternalPageModule} from './component/external/external.module';

import {HttpService} from './service/core/HttpService';

/**
 * i18n
 *
 * @export
 * @class AppModule
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    ExternalPageModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
