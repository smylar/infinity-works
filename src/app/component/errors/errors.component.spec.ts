import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsComponent } from './errors.component';
import { ErrorsService } from "src/app/service/errors.service";
import { By } from "@angular/platform-browser";

describe('ErrorsComponent', () => {
  let component: ErrorsComponent;
  let fixture: ComponentFixture<ErrorsComponent>;
  let errorsService: ErrorsService;

  beforeEach(async(() => {
      
     errorsService = new ErrorsService();
      
    TestBed.configureTestingModule({
      declarations: [ ErrorsComponent ],
      providers: [ {provide: ErrorsService, useValue: errorsService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display error', () => {
      
      component.ngOnInit();
      fixture.detectChanges();
      let errors = fixture.debugElement.query(By.css('.errors'));
      expect(errors).toBeNull();      
      errorsService.add('this is an error');
      fixture.detectChanges();
      errors = fixture.debugElement.query(By.css('.errors'));
      expect(errors.nativeElement.innerText).toBe('this is an error');
  });
});
