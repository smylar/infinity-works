import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ErrorsComponent } from "src/app/component/errors/errors.component";


class BlankCmp {
    
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
          RouterTestingModule.withRoutes(
            [{path: 'ratings', component: BlankCmp}]
          )
      ],
      declarations: [
        AppComponent,
        ErrorsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Infinity Works Demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Infinity Works Demo');
  });

});
