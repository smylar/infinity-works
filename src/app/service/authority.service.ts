import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Authorities } from '../model/authorities';
import { ErrorsService } from './errors.service';
import { Constants } from "src/app/constants";

/**
 * Provides Authority related handling via the food.gov.uk api
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  constructor(private http: HttpClient, 
              private errorsService: ErrorsService,
              private constants: Constants) { }
  
  getAuthorities(): Observable<Authorities> {
      return this.http.get<Authorities>(this.constants.authoritiesPath, { headers: {'x-api-version':'2'} })
                 .pipe(
                         retry(1),
                         catchError(this.errorsService.handleError<Authorities>('getAuthorities', new Authorities()))
                 );
    }
  
}
