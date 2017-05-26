import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { AvtorizacijaServiceProvider } from '../../providers/avtorizacija-service';
import { RestavracijePage } from '../restavracije/restavracije';
import { TabsPage } from '../tabs/tabs';

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

  public prijava() {
    this.pokaziNalaganje()
    this.avtorizacija.prijava(this.prijavniPodatki).then(allowed => {
      //alert(allowed);
      if (allowed) {
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.pokaziNapako("Dostop zavrnjen!");
      }
    },
      error => {
        this.pokaziNapako(error);
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
