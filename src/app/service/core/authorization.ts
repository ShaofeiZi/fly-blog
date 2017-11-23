import { Injectable, NgZone } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StorageService } from './storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class AuthorizationService implements CanActivate, CanActivateChild, CanDeactivate<CanComponentDeactivate> {
  Config: any;
  Session: any;

  sessionSubject: any;

  private defaultHeaders: Headers = new Headers();


  constructor(private storageService: StorageService, private httpClient: HttpClient,
    private router: Router) {
    this.Session = this.storageService.getToken();
    this.sessionSubject = new BehaviorSubject(this.Session);
  }

  /**
   *
   *
   * @returns  获取TOKEN
   *
   * @memberof AuthorizationService
   */
  getSession() {
    this.Session = this.storageService.getToken();
    return this.Session;
  }

  /**
   * 设置TOKEN
   *
   * @param {any} token
   *
   * @memberof AuthorizationService
   */
  setSession(token) {
    if (token) {
      // NgZone 做脏检查
      this.storageService.setToken(token);
      this.Session = this.storageService.getToken();
      this.sessionSubject.next(this.Session);
    }
  }

  /**
   * 返回session Subject
   *
   * @returns {any}
   */
  getSessionSubject() {
    return this.sessionSubject;
  }


  /**
   * 路由守卫 如果没有TOKEN 直接去Login
   *
   * @returns
   *
   * @memberof AuthorizationService
   */
  canActivate() {
    // // let aa = this.storageService.getAllCookie();
    // this.Session = this.storageService.getToken();
    // // console.log('canActivate =>', this.Session);
    // if (this.Session && this.Session.user && this.Session.access_token) {
    //
    // } else {
    //   window.location.href = 'login';
    //   return false;
    // }

    return true;
  }

  /**
   *
   * 子路由守卫
   * @returns
   * @memberof AuthorizationService
   */
  canActivateChild() {
    return this.canActivate();
  }



  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

  /**
   *
   * @param model
   * @returns {Observable<any>}
   */
  public login(model): Observable<any> {
    return this.httpClient.get('/api/items').switchMap((response: Response) => response.json());
  }


  // 检查浏览器版本
  /**
   *
   *
   * @returns {string} 浏览器类型
   *
   * @memberof AuthorizationService
   */
  public DetectionUA(): string {
    const obj = this.DetectionUAObj();
    return obj.browser;
  }

  // 返回一个对象 携带 browser和version
  public DetectionUAObj(): any {

    const userAgent = navigator.userAgent,
      rMsie = /(msie\s|trident\/7)([\w.]+)/,
      rTrident = /(trident)\/([\w.]+)/,
      rFirefox = /(firefox)\/([\w.]+)/,
      rOpera = /(opera).+version\/([\w.]+)/,
      rNewOpera = /(opr)\/(.+)/,
      rChrome = /(chrome)\/([\w.]+)/,
      rSafari = /version\/([\w.]+).*(safari)/,
      rSafari2 = /(safari)\/([\w.]+)/;
    let matchBS, matchBS2;
    let browser;
    let version;
    // tslint:disable-next-line:no-unused-variable
    const ua = userAgent.toLowerCase();
    // tslint:disable-next-line:no-shadowed-variable
    const uaMatch = function (ua) {
      matchBS = rMsie.exec(ua);
      if (matchBS != null) {
        matchBS2 = rTrident.exec(ua);
        if (matchBS2 != null) {
          switch (matchBS2[2]) {
            case '4.0':
              return { browser: 'IE', version: '8' };
            // break;
            case '5.0':
              return { browser: 'IE', version: '9' };
            // break;
            case '6.0':
              return { browser: 'IE', version: '10' };
            // break;
            case '7.0':
              return { browser: 'IE', version: '11' };
            // break;
            default:
              return { browser: 'IE', version: 'undefined' };
          }
        } else {
          return { browser: 'IE', version: matchBS[2] || '0' };
        }
      }
      matchBS = rFirefox.exec(ua);
      if ((matchBS != null)) {
        return { browser: matchBS[1] || '', version: matchBS[2] || '0' };
      }
      matchBS = rOpera.exec(ua);
      if ((matchBS != null)) {
        return { browser: matchBS[1] || '', version: matchBS[2] || '0' };
      }
      matchBS = rChrome.exec(ua);
      if ((matchBS != null)) {
        matchBS2 = rNewOpera.exec(ua);
        if (matchBS2 == null) {
          return { browser: matchBS[1] || '', version: matchBS[2] || '0' };
        } else {
          return { browser: 'Opera', version: matchBS2[2] || '0' };
        }
      }
      matchBS = rSafari2.exec(ua);
      // console.log('<safair2>', ua, matchBS);
      if ((matchBS != null)) {
        return { browser: matchBS[1] || '', version: matchBS[2] || '0' };
      }
      // 这个是来监测 version 的-> 也是正确的
      matchBS = rSafari.exec(ua);
      // console.log('<safair>', ua, matchBS);
      if ((matchBS != null)) {
        return { browser: matchBS[2] || '', version: matchBS[1] || '0' };
      }
      if (matchBS != null) {
        return { browser: 'undefined', version: ' browser' };
      }
    };
    const browserMatch = uaMatch(userAgent.toLowerCase());
    if (browserMatch.browser) {
      browser = browserMatch.browser;
      version = browserMatch.version;
    }
    // console.log(browser + version);
    const obj = {
      browser: browser,
      version: version
    };
    return obj;
  }


  // 退出登录
  logout() {
    if (this.Session && this.Session.currentAccount) {
      this.Session.currentAccount.id = null;
    }
    this.storageService.setToken(null);
    this.Session = null; // this.storageService.getToken();
  }


}
