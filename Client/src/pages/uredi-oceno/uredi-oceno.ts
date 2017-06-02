import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OceneServiceProvider } from "../../providers/ocene-service"
import { OcenePage } from "../ocene/ocene";

@IonicPage()
@Component({
  selector: 'page-uredi-oceno',
  templateUrl: 'uredi-oceno.html',
})
export class UrediOcenoPage {
  seznamOcen: any;
  ocena: any;

  id: any;
  restavracija: any;
  ocena1: any; 
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private oceneService: OceneServiceProvider, private alertCtrl: AlertController) {
    this.restavracija = navParams.get('restavracija');
    this.ocena1 = navParams.get('ocena');
    
    console.log(this.ocena1); 
  } 

  getDatum() {
    var date = new Date();
    var datumNow = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    return datumNow;
  }

  urediOceno(ocena, id){
    if(ocena == null){
      this.presentAlert("Vsa polja morajo biti izpolnjena!");
    }else{
      console.log("Ocena", ocena);
      this.oceneService.updateOcena(ocena, id); 
      this.presentAlert("Sprememba zabeležena.");
    }
  }

  /*
  oceneRestavracij(restavracija, ocena){
    this.navCtrl.push(OcenePage, {
      restavracija: restavracija,
      ocena: ocena
    });
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad UrediOcenoPage');
  }

  presentAlert(text) {
    let alert = this.alertCtrl.create({
      //title: '',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
