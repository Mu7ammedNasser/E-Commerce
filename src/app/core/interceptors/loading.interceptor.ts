import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _NgxSpinnerService = inject(NgxSpinnerService);

  // Show the spinner when the request is made
  _NgxSpinnerService.show();

  // Record the start time
  const startTime = new Date().getTime();

  // Handle the request and response, ensuring spinner stays for at least 1 second
  return next(req).pipe(
    finalize(() => {
      const endTime = new Date().getTime();
      const elapsedTime = endTime - startTime;

      // Calculate the remaining time to make sure the spinner is visible for at least 1 second
      const remainingTime = Math.max(0, 500 - elapsedTime); // avoid negative values

      // Hide the spinner after the remaining time
      setTimeout(() => {
        _NgxSpinnerService.hide();
      }, remainingTime);
    })
  );
};
