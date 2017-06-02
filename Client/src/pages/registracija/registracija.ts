import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { PrijavaPage } from '../../pages/prijava/prijava';
import { AvtorizacijaServiceProvider } from '../../providers/avtorizacija-service';

@IonicPage()
@Component({
  selector: 'page-registracija',
  templateUrl: 'registracija.html',
})

export class RegistracijaPage {
  registracijskiPodatki = { ime: '', priimek: '', email: '', upIme: '', geslo: '' };

  constructor(private navCtrl: NavController, private avtorizacija: AvtorizacijaServiceProvider, private alertCtrl: AlertController, private navParams: NavParams) { }

  public registracija() {
    this.avtorizacija.registracija(this.registracijskiPodatki).then(allowed => {
      if (allowed) {
        this.pokaziObvestilo("Uspešno", "Račun uspešno ustvarjen.");
        this.navCtrl.push(PrijavaPage);
      } else {
        this.pokaziObvestilo("Napaka", "Težava pri ustvarjanju računa.")
      }
    },
      error => {
        this.pokaziObvestilo("Napaka", error);
      });
  }

  pokaziObvestilo(title, text) {
    let opozorilo = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    opozorilo.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistracijaPage');
  }
}
