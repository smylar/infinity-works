import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsComponent } from './ratings.component';
import { FormsModule } from '@angular/forms';
import { AuthorityService } from "src/app/service/authority.service";
import { EstablishmentService } from "src/app/service/establishment.service";
import { Authorities } from "src/app/model/authorities";
import { Observable, of, throwError } from "rxjs";
import { Establishments } from "src/app/model/establishments";
import { AuthorityRatingSummary } from "src/app/model/authorityRatingSummary";
import { By } from "@angular/platform-browser";
import { AspercentagePipe } from "src/app/pipe/aspercentage.pipe";

describe('RatingsComponent', () => {
  let component: RatingsComponent;
  let fixture: ComponentFixture<RatingsComponent>;

  let authorityServiceStub: { getAuthorities: jasmine.Spy };
  let establishmentServiceStub: { getEstablishments: jasmine.Spy };

  beforeEach(() => {
      
      authorityServiceStub = jasmine.createSpyObj('AuthorityService', ['getAuthorities']);
      establishmentServiceStub = jasmine.createSpyObj('EstablishmentService', ['getEstablishments']);
      
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ RatingsComponent, AspercentagePipe ],
      providers:    [ {provide: AuthorityService, useValue: authorityServiceStub },
                      {provide: EstablishmentService, useValue: establishmentServiceStub }]
    
    });
    
    fixture = TestBed.createComponent(RatingsComponent);
    component = fixture.componentInstance;
    
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should contain authorities on init', () => {
      const expected: Authorities =
      {
            authorities:[ {LocalAuthorityId: 1, Name: 'auth', RegionName: 'region'} ]
      };
   
      authorityServiceStub.getAuthorities.and.returnValue(of(expected));
      component.ngOnInit();
      //might I need a wait here? though it does pass at the moment
      expect(component.authorities).toEqual(expected.authorities, 'expected authorities');
   });
  
  it('should contain ratings on select', () => {
      
      const expected: Authorities =
      {
            authorities:[ {LocalAuthorityId: 1, Name: 'auth', RegionName: 'region'} ]
      };
   
      authorityServiceStub.getAuthorities.and.returnValue(of(expected));
      
      const est: Establishments =
      {
            establishments:[ {LocalAuthorityId: 1, BusinessName: 'a business', RatingValue: '3-Star'} ]
      };
   
      establishmentServiceStub.getEstablishments.and.returnValue(of(est));
      component.ngOnInit();
      fixture.detectChanges();
      let table = fixture.debugElement.query(By.css('#ratingsTable'));
      expect(table).toBeNull();
      component.setAuthority({LocalAuthorityId: 1, Name: 'auth', RegionName: 'region'});
      fixture.detectChanges();
      table = fixture.debugElement.query(By.css('#ratingsTable'));
      expect(table).toBeDefined();
      let cells = table.queryAll(By.css('td'));
      expect(cells.length).toBe(12);
      expect(cells[0].nativeElement.innerText).toBe('5-Star');
      expect(cells[1].nativeElement.innerText).toBe('0%');
      
      expect(cells[2].nativeElement.innerText).toBe('4-Star');
      expect(cells[3].nativeElement.innerText).toBe('0%');
      
      expect(cells[4].nativeElement.innerText).toBe('3-Star');
      expect(cells[5].nativeElement.innerText).toBe('100%');
      
      expect(cells[6].nativeElement.innerText).toBe('2-Star');
      expect(cells[7].nativeElement.innerText).toBe('0%');
      
      expect(cells[8].nativeElement.innerText).toBe('1-Star');
      expect(cells[9].nativeElement.innerText).toBe('0%');
      
      expect(cells[10].nativeElement.innerText).toBe('Exempt');
      expect(cells[11].nativeElement.innerText).toBe('0%');
      
   });
  
});
