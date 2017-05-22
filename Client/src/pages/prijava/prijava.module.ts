import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrijavaPage } from './prijava';

@NgModule({
  declarations: [
    PrijavaPage,
  ],
  imports: [
    IonicPageModule.forChild(PrijavaPage),
  ],
  exports: [
    PrijavaPage
  ]
})
export class PrijavaPageModule {}
