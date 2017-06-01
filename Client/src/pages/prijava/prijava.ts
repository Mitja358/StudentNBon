import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';

import { AvtorizacijaServiceProvider } from '../../providers/avtorizacija-service';
//import { RestavracijePage } from '../restavracije/restavracije';
import { TabsPage } from "../tabs/tabs";

// Za testiranje localStorage odkomentiraj naslednji 2 vrstici, poženi app in spet zakomentiraj! 
//localStorage.removeItem("id");
//localStorage.removeItem("upIme");
//localStorage.removeItem("geslo");
//let upIme_local = localStorage.getItem("upIme");
//let geslo_local = localStorage.getItem("geslo");

@IonicPage()
@Component({
  selector: 'page-prijava',
  templateUrl: 'prijava.html',
})

export class PrijavaPage {  
  loading: Loading;
  prijavniPodatki = { upIme: '', geslo: '' };
  upIme_local: string;

  constructor(private navCtrl: NavController, private avtorizacija: AvtorizacijaServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    //let pridobi = localStorage.getItem("uporabnik");
    //console.log("PRIDOBI: " + pridobi);
    //let poljeObjektov = JSON.parse(pridobi);
    //console.log("poljeObjektov: " + poljeObjektov[0].upIme);
    //this.upIme_local = poljeObjektov[0].upIme;
    //console.log("NOVO: " + this.upIme_local); 
   }
  
  public ustvariRacun() {
    this.navCtrl.push('RegistracijaPage');
  }

  // Preverja vrednost localStorage
  ionViewDidLoad() {    
    if (localStorage.getItem("uporabnik") !== null) {
      let pridobi = localStorage.getItem("uporabnik");
      let poljeObjektov = JSON.parse(pridobi);
      this.upIme_local = poljeObjektov[0].upIme;
      this.navCtrl.push(TabsPage);
    } 
  }

  public prijava() {
    this.pokaziNalaganje()
    //Prej je bilo namesto .then -> .subscribe in subscribe v oklepaju!
    this.avtorizacija.prijava(this.prijavniPodatki).then(allowed => {
      if (allowed) {
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.pokaziNapako("Neveljavni podatki za prijavo!");
      }
    },
    error => {
      this.pokaziNapako('Error');
    });
  }

  pokaziNalaganje() {
    this.loading = this.loadingCtrl.create({
      content: 'Prosimo počakajte ...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  pokaziNapako(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Napaka',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}

/*
  ionViewDidLoad() {
    console.log('ionViewDidLoad PrijavaPage');
  }
*/
