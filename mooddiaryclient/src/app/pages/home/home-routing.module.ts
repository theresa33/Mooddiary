import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    // children: [
    //   {
    //     path: 'dashboard',
    //     children: [
    //       {
    //         path: '',
    //         loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
    //       }
    //     ]
    //   },
    //   {
    //     path: 'entry',
    //     children: [
    //       {
    //         path: '',
    //         loadChildren: () => import('../entry/entry.module').then(m => m.EntryPageModule)
    //       }
    //     ]
    //   },
    //   {
    //     path: 'medpack',
    //     children: [
    //       {
    //         path: '',
    //         loadChildren: () => import('../medpack/medpack.module').then(m => m.MedpackPageModule)
    //       }
    //     ]
    //   },
    //   {
    //     path:'',
    //     redirectTo: '/app/home/dashboard',
    //     pathMatch: 'full'
    //   }
    //]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
