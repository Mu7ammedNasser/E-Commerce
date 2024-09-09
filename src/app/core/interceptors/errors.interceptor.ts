import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      Swal.fire({
        title: 'Error!',
        text: err.error.message,
        icon: 'error',
      });
      console.log('intercpector', err.error.message);

      return throwError(() => err);
    })
  );
};
