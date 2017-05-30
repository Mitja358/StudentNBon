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
  geslo_local: string;

  constructor(private navCtrl: NavController, private avtorizacija: AvtorizacijaServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    console.info('constructor');
    this.upIme_local = localStorage.getItem('upIme');
    this.geslo_local = localStorage.getItem('geslo');
   }
  
  public ustvariRacun() {
    this.navCtrl.push('RegistracijaPage');
  }

  // Preverja vrednost localStorage
  ionViewDidLoad() {
    console.log(this.upIme_local, this.geslo_local);    
    if (this.upIme_local !== null && this.geslo_local !== null) {
      console.log("DidLoad: " + this.upIme_local);
      this.navCtrl.push(TabsPage);
    } 
  }

  public prijava() {
    console.log("LocalStorage1: " + this.upIme_local + ", " + this.geslo_local);
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
      this.pokaziNapako('error');
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
