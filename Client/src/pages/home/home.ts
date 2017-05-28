import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvtorizacijaServiceProvider } from '../../providers/avtorizacija-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  uporabniskoIme = '';
  email = '';
  constructor(private navCtrl: NavController, private avtorizacija: AvtorizacijaServiceProvider) {
    let informacije = this.avtorizacija.pridobiPodatkeUporabnika();
    this.uporabniskoIme = informacije['ime'];
    this.email = informacije['email'];
  }

  public odjava() {
    this.avtorizacija.odjava().subscribe(success => {
      this.navCtrl.setRoot('PrijavaPage');
    });
  }
}
