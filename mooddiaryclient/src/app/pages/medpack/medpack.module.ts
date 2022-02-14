import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedpackPageRoutingModule } from './medpack-routing.module';

import { MedpackPage } from './medpack.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedpackPageRoutingModule
  ],
  declarations: [MedpackPage]
})
export class MedpackPageModule {}
