import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('access_token');
    const clonedRequest = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });

    return next.handle(clonedRequest);
  }
  
}



export const headersInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: HeadersInterceptor,
  multi: true,
};

