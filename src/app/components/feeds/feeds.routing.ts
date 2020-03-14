import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FeedsComponent } from './feeds.component';

const routes: Routes = [
  { path: "", component: FeedsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FeedsRoutingModule { }
