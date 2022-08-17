import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoadingService } from './loading.service';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private toast: ToastService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        this.loadingService.stop();
        if (err.error) {
          this.toast.show(err.error.message, {
            classname: 'bg-danger text-light',
            delay: 5000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 4500);
        }
        return throwError(() => err);
      })
    );
  }
}
