import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenijiServiceProvider } from "../../providers/meniji-service";

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


