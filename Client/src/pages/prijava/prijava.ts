import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';

import { AvtorizacijaServiceProvider } from '../../providers/avtorizacija-service';
import { TabsPage } from "../tabs/tabs";

let email_local = localStorage.getItem("email");
let geslo_local = localStorage.getItem("geslo");

@IonicPage()
@Component({
  selector: 'page-prijava',
  templateUrl: 'prijava.html',
})

export class PrijavaPage {  
  loading: Loading;
  prijavniPodatki = { email: '', geslo: '' };

  constructor(private navCtrl: NavController, private avtorizacija: AvtorizacijaServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
  
  public ustvariRacun() {
    this.navCtrl.push('RegistracijaPage');
  }

  // Preverja vrednost localStorage
  ionViewDidLoad() {    
    if (email_local !== null) {
      console.log("DidLoad: " + email_local);
      this.navCtrl.push(TabsPage);
    } 
  }

  public prijava() {
    console.log("LocalStorage1: " + email_local + ", " + geslo_local);

    this.pokaziNalaganje()
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
