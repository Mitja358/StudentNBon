import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenijiServiceProvider } from "../../providers/meniji-service";
import { VrstaMenijaServiceProvider } from "../../providers/vrstamenija-service";
import { ZemljevidPage } from "../zemljevid/zemljevid";
import { OceneServiceProvider } from "../../providers/ocene-service";

/**
 * Generated class for the PodrobnostiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-podrobnosti',
  templateUrl: 'podrobnosti.html',
})
export class PodrobnostiPage {

  restavracija: any;
  seznamMenijev = [];
  tipiMenijev = [];
  povprecnaOcena: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private menijiService: MenijiServiceProvider, private oceneService: OceneServiceProvider) {
    this.restavracija = navParams.get('restavracija'); 
    this.getMenije(this.restavracija);
    this.getTipPrehrane(this.restavracija);
    this.getPovprecnoOceno(this.restavracija);
  }

  getMenije(restavracija){
      this.menijiService.getMenije(restavracija).subscribe(data => this.seznamMenijev = data);
  }

  getTipPrehrane(restavracija){
    this.menijiService.getTipPrehrane(restavracija).subscribe(tip => this.tipiMenijev = tip);
  }

  getPovprecnoOceno(restavracija){
    this.oceneService.getPovprecnoOceno(restavracija).subscribe(povprecje => this.povprecnaOcena = povprecje);
  }

  prikazZemljevida(restavracija){
    this.navCtrl.push(ZemljevidPage, {
      restavracija: restavracija
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PodrobnostiPage');
  }

}


