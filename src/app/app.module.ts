import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RatingsComponent } from './component/ratings/ratings.component';
import { ErrorsComponent } from './component/errors/errors.component';
import { AspercentagePipe } from './pipe/aspercentage.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RatingsComponent,
    ErrorsComponent,
    AspercentagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
