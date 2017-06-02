import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UrediOcenoPage } from './uredi-oceno';

@NgModule({
  declarations: [
    UrediOcenoPage,
  ],
  imports: [
    IonicPageModule.forChild(UrediOcenoPage),
  ],
  exports: [
    UrediOcenoPage
  ]
})
export class UrediOcenoPageModule {}
