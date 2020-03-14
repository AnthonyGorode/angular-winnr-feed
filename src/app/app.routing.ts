import { FeedsModule } from './components/feeds/feeds.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: "feeds",
    loadChildren: () => import('./components/feeds/feeds.module').then(f => f.FeedsModule)
  },
  { path: "", redirectTo: "/feeds", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
