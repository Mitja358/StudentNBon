import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ZemljevidPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-zemljevid',
  templateUrl: 'zemljevid.html',
})
export class ZemljevidPage {
  restavracija: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.restavracija = navParams.get('restavracija'); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZemljevidPage');
  }

}
