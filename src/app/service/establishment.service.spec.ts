import { TestBed } from '@angular/core/testing';

import { EstablishmentService } from './establishment.service';
import { HttpClient } from "@angular/common/http";
import { ErrorsService } from "src/app/service/errors.service";
import { Establishments } from "src/app/model/establishments";
import { Observable, of, throwError } from "rxjs";

describe('EstablishmentService', () => {
    
    let httpClientSpy: { get: jasmine.Spy };
    let errorSpy: { handleError: jasmine.Spy };
    let error: string;
    
  beforeEach(() => {
      error = 'none'
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      errorSpy = jasmine.createSpyObj('ErrorsService', ['handleError']);
      TestBed.configureTestingModule({
      providers:    [ {provide: HttpClient, useValue: httpClientSpy },
                      {provide: ErrorsService, useValue: errorSpy }]
      })
  });

  it('should be created', () => {
    const service: EstablishmentService = TestBed.get(EstablishmentService);
    expect(service).toBeTruthy();
  });
  
  it('should return expected establishments (HttpClient called once)', () => {
      const establishmentService: EstablishmentService = TestBed.get(EstablishmentService);
      const expected: Establishments =
        {
              establishments:[ {LocalAuthorityId: 1, 
                                BusinessName: 'name',
                                RatingValue: 'mega rating'} ]
        };
     
      httpClientSpy.get.and.returnValue(of(expected));
      
      errorSpy.handleError.and.returnValue((err: any):Observable<Establishments> => {
          error = err;
          return of(new Establishments());
        });
     
      establishmentService.getEstablishments(1).subscribe(
        auth => expect(auth).toEqual(expected, 'expected establishments'),
        fail
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
      expect(error).toBe('none', 'error function not called');
   });
  
  it('should return empty on error', () => {
      const establishmentService: EstablishmentService = TestBed.get(EstablishmentService);
      const expected: Establishments =
      {
            establishments:[ {LocalAuthorityId: 1, 
                              BusinessName: 'name',
                              RatingValue: 'mega rating'} ]
      };
     
      httpClientSpy.get.and.returnValue(throwError('an error'));
      
      errorSpy.handleError.and.returnValue((err: any):Observable<Establishments> => {
          error = err;
          return of(new Establishments());
        });
     
      establishmentService.getEstablishments(1).subscribe(
        est => expect(est.establishments.length).toBe(0, 'no establishments'),
        fail
      );
      expect(error).toBe('an error', 'error function called');
   });
});
