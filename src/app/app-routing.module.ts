import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatingsComponent }              from './component/ratings/ratings.component';

const routes: Routes = [{ path: 'ratings', component: RatingsComponent } ];
                       
  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}