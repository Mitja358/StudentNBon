import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestavracijePage } from './restavracije';

@NgModule({
  declarations: [
    RestavracijePage,
  ],
  imports: [
    IonicPageModule.forChild(RestavracijePage),
  ],
  exports: [
    RestavracijePage
  ]
})
export class RestavracijePageModule {}
