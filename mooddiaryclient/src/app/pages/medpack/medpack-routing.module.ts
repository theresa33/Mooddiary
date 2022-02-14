import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedpackPage } from './medpack.page';

const routes: Routes = [
  {
    path: '',
    component: MedpackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedpackPageRoutingModule {}
