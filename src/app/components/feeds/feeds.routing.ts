import { FeedsUserComponent } from './feeds-user/feeds-user.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FeedsComponent } from './feeds.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: "", component: FeedsComponent },
  { 
    path: "user", 
    component: FeedsUserComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FeedsRoutingModule { }
