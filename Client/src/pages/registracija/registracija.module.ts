import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistracijaPage } from './registracija';

@NgModule({
  declarations: [
    RegistracijaPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistracijaPage),
  ],
  exports: [
    RegistracijaPage
  ]
})
export class RegistracijaPageModule {}
