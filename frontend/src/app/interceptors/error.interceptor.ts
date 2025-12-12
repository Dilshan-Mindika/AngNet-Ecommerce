import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const toastr = inject(ToastrService);
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unknown error occurred!';

            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMessage = `Error: ${error.error.message}`;
            } else {
                // Server-side error
                if (error.status === 401) {
                    errorMessage = 'Session expired. Please login again.';
                    // Optional: router.navigate(['/login']);
                } else if (error.status === 403) {
                    errorMessage = 'You do not have permission to perform this action.';
                } else if (error.status === 404) {
                    errorMessage = 'Resource not found.';
                } else if (error.status === 500) {
                    errorMessage = 'Internal Server Error. Please try again later.';
                } else if (error.error) {
                    // Try to extract message string from backend error object
                    if (typeof error.error === 'string') {
                        errorMessage = error.error;
                    } else if (error.error.message) {
                        errorMessage = error.error.message;
                    } else if (error.error.title) {
                        errorMessage = error.error.title;
                    }
                }
            }

            // Don't show toast for 404 if it's just a check (optional)
            toastr.error(errorMessage, 'Error');
            console.error('HTTP Error:', error);

            return throwError(() => error);
        })
    );
};
