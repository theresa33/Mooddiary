import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'entry',
  //   // path: 'entry/:id',
  //   loadChildren: () => import('./pages/entry/entry.module').then( m => m.EntryPageModule)
  // },
  // {
  //   path: 'entry-list',
  //   loadChildren: () => import('./pages/entry-list/entry-list.module').then( m => m.EntryListPageModule)
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'medpack',
  //   loadChildren: () => import('./pages/medpack/medpack.module').then( m => m.MedpackPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
