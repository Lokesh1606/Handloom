import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { LoginSubmit } from "../model/login";
import { ApiConfig } from "./ApiConfig";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
     providedIn: 'root'
})
export class ApiCall {
    constructor(
        private api: HttpClient
    ) {}

    loginSubmit(loginSubmit: LoginSubmit): Observable<any> {
        return this.api.post(ApiConfig.login, loginSubmit).pipe(
            map(response => response),
            catchError(this.handleError)
        );
    }

    signup(signupData: { email: string; username: string; password: string }): Observable<any> {
        return this.api.post(ApiConfig.signup, signupData);
    }

    // Generic GET method
    get(endpoint: string): Observable<any> {
        return this.api.get(ApiConfig.baseUrl + endpoint).pipe(
            map(response => response),
            catchError(this.handleError)
        );
    }

    // Generic POST method
    post(endpoint: string, data: any): Observable<any> {
        return this.api.post(ApiConfig.baseUrl + endpoint, data).pipe(
            map(response => response),
            catchError(this.handleError)
        );
    }

    // Add more methods as needed: put, delete, etc.

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Backend returned an unsuccessful response code
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}