import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';

import { AvtorizacijaServiceProvider } from '../../providers/avtorizacija-service';
import { TabsPage } from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-prijava',
  templateUrl: 'prijava.html',
})

export class PrijavaPage {  
  loading: Loading;
  prijavniPodatki = { upIme: '', geslo: '' };

  constructor(private navCtrl: NavController, private avtorizacija: AvtorizacijaServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
  
  public ustvariRacun() {
    this.navCtrl.push('RegistracijaPage');
  }

  ionViewDidLoad() {    
    if (localStorage.getItem("uporabnik") !== null) {
      this.navCtrl.push(TabsPage);
    } 
  }

  public prijava() {
    this.pokaziNalaganje()
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
