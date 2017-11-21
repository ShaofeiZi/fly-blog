import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { hmrBootstrap } from './hmr';
if (environment.production) {
  enableProdMode();
}
const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));;
};

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR没有启用，确保 ng server 命令加上 --hmr 标记');
  }
} else {
  bootstrap();
}
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));
