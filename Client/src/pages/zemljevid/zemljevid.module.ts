import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZemljevidPage } from './zemljevid';

@NgModule({
  declarations: [
    ZemljevidPage,
  ],
  imports: [
    IonicPageModule.forChild(ZemljevidPage),
  ],
  exports: [
    ZemljevidPage
  ]
})
export class ZemljevidPageModule {}
