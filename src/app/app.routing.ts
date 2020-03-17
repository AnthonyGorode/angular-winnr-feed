import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { 
    path: "feeds",
    loadChildren: () => import('./components/feeds/feeds.module').then(f => f.FeedsModule)
  },
  {
    path: "auth",
    loadChildren: () => import('./components/auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: "users",
    loadChildren: () => import('./components/users/users.module').then(u => u.UsersModule),
    canActivate: [AuthGuard,RoleGuard]
  },
  { path: "", redirectTo: "/feeds", pathMatch: "full"},
  {path:'**', redirectTo: "/feeds", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
