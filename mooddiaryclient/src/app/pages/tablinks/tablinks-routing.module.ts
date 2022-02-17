import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [
  {
    path: 'tablinks',
    component: TablinksPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'entry',
        loadChildren: () => import('../entry/entry.module').then(m => m.EntryPageModule)
      },
      {
        path: 'entry-list',
        loadChildren: () => import('../entry-list/entry-list.module').then(m => m.EntryListPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'medpack',
        loadChildren: () => import('../medpack/medpack.module').then(m => m.MedpackPageModule)
      }
    ]
  },
  {
    path:'',
    redirectTo: '/tablinks/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule {}
