import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NastavitvePage } from './nastavitve';

@NgModule({
  declarations: [
    NastavitvePage,
  ],
  imports: [
    IonicPageModule.forChild(NastavitvePage),
  ],
  exports: [
    NastavitvePage
  ]
})
export class NastavitvePageModule {}
