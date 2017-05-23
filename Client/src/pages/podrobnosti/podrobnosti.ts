import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenijiServiceProvider } from "../../providers/meniji-service";

@IonicPage()
@Component({
  selector: 'page-podrobnosti',
  templateUrl: 'podrobnosti.html',
})
export class PodrobnostiPage {

  seznamMenijev = [];
  restavracija: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private menijiService: MenijiServiceProvider) {
    this.restavracija = navParams.get('restavracija'); 
    this.getMenije(this.restavracija);
  }

  getMenije(restavracija){
      this.menijiService.getMenije(restavracija).subscribe(data => this.seznamMenijev = data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PodrobnostiPage');
  }
}


