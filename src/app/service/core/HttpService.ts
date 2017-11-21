import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).do((res: HttpResponse<any>) => {
          req = req.clone({
            setHeaders: {
              Authorization: 'wfghjbgfghj'
            }
          });
          console.warn('发出请求' + req.url);
        return res.body;
      }, (err: HttpErrorResponse) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
        }
        return err.error;
      });
    }
  }


