import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestavracijeServiceProvider } from "../../providers/restavracije-service";
import { PodrobnostiPage } from '../../pages/podrobnosti/podrobnosti';


/**
 * Generated class for the RestavracijePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-restavracije',
  templateUrl: 'restavracije.html',
})
export class RestavracijePage {

  seznamRestavracij = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private restavracijeService: RestavracijeServiceProvider) {
    this.getRestavracije();
  }

  getRestavracije(){
    //this.restavracijeService.getRestavracije().subscribe(data => console.log(data));
    this.restavracijeService.getRestavracije().subscribe(data => this.seznamRestavracij = data);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RestavracijePage');
  }

  //navCtrl --> prehajanje med stranmi
  podrobnostiRestavracije(restavracija){ 
    this.navCtrl.push(PodrobnostiPage, {
      restavracija: restavracija
    });
  }
}
