import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Establishments } from '../model/establishments';
import { ErrorsService } from './errors.service';
import { Constants } from "src/app/constants";

/**
 * Provides Establishment related handling via the food.gov.uk api
 */
@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  constructor(private http: HttpClient, 
              private errorsService: ErrorsService,
              private constants: Constants) { }
  
  getEstablishments(authorityId: number): Observable<Establishments> {
      return this.http.get<Establishments>(this.constants.establishmentsPath, 
                                          { headers: {'x-api-version':'2'}, 
                                             params: {'localAuthorityId': ''+authorityId}})
                      .pipe(
                              retry(1),
                              catchError(this.errorsService.handleError<Establishments>(`getEstablishments authorityId=${authorityId}`, new Establishments()))
                      );
    }
}
