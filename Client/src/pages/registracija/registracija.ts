import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AvtorizacijaServiceProvider } from '../../providers/avtorizacija-service';

@IonicPage()
@Component({
  selector: 'page-registracija',
  templateUrl: 'registracija.html',
})

export class RegistracijaPage {
  createSuccess = false;
  registracijskiPodatki = { email: '', geslo: '' };

  constructor(private navCtrl: NavController, private avtorizacija: AvtorizacijaServiceProvider, private alertCtrl: AlertController, private navParams: NavParams) { }

  public registracija() {
    this.avtorizacija.registracija(this.registracijskiPodatki).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.pokaziObvestilo("Uspešno", "Račun uspešno ustvarjen.");
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
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    opozorilo.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistracijaPage');
  }

}
