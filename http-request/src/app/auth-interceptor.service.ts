import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on its way');
    const modifiedRequest = request.clone({
      headers: request.headers.append('Auth', 'Bearer ttt')
    });
    return next.handle(modifiedRequest)
      .pipe(tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log('Response body ' + JSON.stringify(event.body));
        }
      }));
  }
}
