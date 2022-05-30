import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'login',
    loadChildren:() => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path:'signup',
    loadChildren:() => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path:'tabs',
    loadChildren: () => import('./pages/tablinks/tablinks.module').then(m => m.TablinksPageModule),
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
