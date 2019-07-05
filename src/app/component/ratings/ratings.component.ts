import { Component, OnInit } from '@angular/core';

import { Observable, Subject, from, of } from 'rxjs';
import { Authority } from '../../model/authority';
import { Establishment } from '../../model/establishment';
import { AuthorityRatingSummary } from '../../model/authorityRatingSummary';
import { AuthorityService } from '../../service/authority.service';
import { EstablishmentService } from '../../service/establishment.service';
import { ErrorsService } from '../../service/errors.service';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/map'
import { Map } from "core-js";

/**
 * Component loads list of authorities then retrieves ratings for a selected authority
 */
@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  authorities: Authority[];
  selectedAuthority: Authority;
  loading: boolean;

  ratings$: Observable<AuthorityRatingSummary>;
  private searchRatings = new Subject<Authority>();
    
  constructor(private authorityService: AuthorityService,
              private establishmentService: EstablishmentService,
              private errorsService: ErrorsService) { }

  /**
   * Retrieve authority list, searchRatings subject to update ratings$ Observable 
   */
  ngOnInit() {
      this.loading = false;
      this.authorityService.getAuthorities()
                           .subscribe(authorities => this.authorities = authorities.authorities);
      this.ratings$ = this.searchRatings
                          .pipe(
                            distinctUntilChanged(),
                            switchMap((term: Authority) => this.getRatings(term))
                          );
  }
  
  /**
   * Publish new Authority to searchRatings subject, this will update the ratings$ observable and shown on the page
   * 
   * @param auth - Authority to retrieve ratings for
   */
  setAuthority(auth: Authority): void {
      this.loading = true;
      this.errorsService.clear();
      this.searchRatings.next(auth);
  }
  
  
  preserveOrder = (a, b) => a; //sort function to stop keyvalue pipe resorting
  
  private getRatings(auth: Authority): Observable<AuthorityRatingSummary> {
     return this.getRatingsObservable(auth.LocalAuthorityId)
                .finally(() => this.loading = false)
                .reduce((acc,res) => acc.add(res.RatingValue), new AuthorityRatingSummary(auth.RegionName));
  }
  
  private getRatingsObservable(authorityId: number): Observable<Establishment> {
      return this.establishmentService.getEstablishments(authorityId).pipe(
                  switchMap(est => from<Establishment>(est.establishments))
             );
   }

}
