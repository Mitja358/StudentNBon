import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcenePage } from './ocene';

@NgModule({
  declarations: [
    OcenePage,
  ],
  imports: [
    IonicPageModule.forChild(OcenePage),
  ],
  exports: [
    OcenePage
  ]
})
export class OcenePageModule {}
