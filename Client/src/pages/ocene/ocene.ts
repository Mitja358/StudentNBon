import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OceneServiceProvider } from "../../providers/ocene-service";


/**
 * Generated class for the OcenePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ocene',
  templateUrl: 'ocene.html',
})
export class OcenePage {
  
  restavracija: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private oceneService: OceneServiceProvider) {
    this.restavracija = navParams.get('restavracija'); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcenePage');
  }

}
