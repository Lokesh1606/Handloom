import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Add auth token if available (e.g., from localStorage)
  const token = localStorage.getItem('authToken');
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle errors globally
      if (error.status === 401) {
        // Redirect to login or refresh token
        console.error('Unauthorized access');
      } else if (error.status === 500) {
        console.error('Server error');
      }
      return throwError(error);
    })
  );
};