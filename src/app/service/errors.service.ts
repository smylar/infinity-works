import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Service for handling of errors
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

    errors: string[] = [];

    /**
     * Add an error message
     * @param error - The error message
     */
    add(error: string) {
        this.errors.push(error);
    }
    
    /**
     * Clear error messages
     */
    clear() {
        this.errors = [];
    }
    
    /**
     * Allows handling of errors from methods that return Observables
     * It will add and log the message then allow processing to continue by returning an empty Observable
     * 
     * @param operation - Description of what failed
     * @param result - What to return in the Observable
     */
    handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
     
          console.error(error);
          this.add(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
      }
}
