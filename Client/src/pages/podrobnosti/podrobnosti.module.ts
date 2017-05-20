import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PodrobnostiPage } from './podrobnosti';

@NgModule({
  declarations: [
    PodrobnostiPage,
  ],
  imports: [
    IonicPageModule.forChild(PodrobnostiPage),
  ],
  exports: [
    PodrobnostiPage
  ]
})
export class PodrobnostiPageModule {}
