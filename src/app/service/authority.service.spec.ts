//import { TestBed } from '@angular/core/testing';

import { AuthorityService } from './authority.service';
import { Authorities } from "src/app/model/authorities";
import { Observable, of, throwError } from "rxjs";
import { Constants } from "src/app/constants";

describe('AuthorityService', () => {
    
    let httpClientSpy: { get: jasmine.Spy };
    let errorSpy: { handleError: jasmine.Spy };
    let authorityService: AuthorityService;
    let error: string;
     
    beforeEach(() => {
      error = 'none'
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      errorSpy = jasmine.createSpyObj('ErrorsService', ['handleError']);
      
      authorityService = new AuthorityService(<any> httpClientSpy, 
                                              <any> errorSpy,
                                              new Constants());
    });
    
    it('should return expected authorities (HttpClient called once)', () => {
        
        const expected: Authorities =
          {
                authorities:[ {LocalAuthorityId: 1, Name: 'auth', RegionName: 'region'} ]
          };
       
        httpClientSpy.get.and.returnValue(of(expected));
        
        errorSpy.handleError.and.returnValue((err: any):Observable<Authorities> => {
            error = err;
            return of(new Authorities());
          });
       
        authorityService.getAuthorities().subscribe(
          auth => expect(auth).toEqual(expected, 'expected authorities'),
          fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        expect(error).toBe('none', 'error function not called');
     });
    
    it('should return empty on error', () => {
        
        const expected: Authorities =
          {
                authorities:[ {LocalAuthorityId: 1, Name: 'auth', RegionName: 'region'} ]
          };
       
        httpClientSpy.get.and.returnValue(throwError('an error'));
        
        errorSpy.handleError.and.returnValue((err: any):Observable<Authorities> => {
            error = err;
            return of(new Authorities());
          });
       
        authorityService.getAuthorities().subscribe(
          auth => expect(auth.authorities).toBeUndefined(),
          fail
        );
        expect(error).toBe('an error', 'error function called');
     });
    
});


