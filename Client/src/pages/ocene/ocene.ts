import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { OceneServiceProvider } from "../../providers/ocene-service";
import { UrediOcenoPage } from "../uredi-oceno/uredi-oceno";

@IonicPage()
@Component({
  selector: 'page-ocene',
  templateUrl: 'ocene.html',
})

export class OcenePage {

  restavracija: any;
  seznamOcen = [];
  ocena: any;
  uporabnik: any; 

  idPrijavljenega = localStorage.getItem('id');

  pridobi = localStorage.getItem("uporabnik");
  poljeObjektov = JSON.parse(this.pridobi);
  uporabnik_local = this.poljeObjektov[0].id;
    

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private oceneService: OceneServiceProvider, private alertCtrl: AlertController) {
    this.restavracija = navParams.get('restavracija');
    this.ocena = navParams.get('ocena');

    this.getOcene(this.restavracija);

    let pridobi = localStorage.getItem("uporabnik");
    let poljeObjektov = JSON.parse(pridobi);
    let uporabnik_local = poljeObjektov[0].id;
    this.uporabnik = {uporabnik_local};  

    this.ocena = { datum: this.getDatum(), stOcena: '', komentar: '', vrstaOcena: '', restavracija_id: this.restavracija.id, uporabnik_id: uporabnik_local};
  }

  getDatum() {
    var date = new Date();
    var datumNow = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    return datumNow;
  }

  getOcene(restavracija) {
    this.oceneService.getOcene(restavracija).subscribe(data => this.seznamOcen = data);
  }

  addOcena(ocena, restavracija) {
      this.oceneService.addOcena(this.ocena).subscribe((res) => {
        console.log("Dodan oddziv ", res);
        this.oceneService.getOcene(this.restavracija).subscribe(data => {
          console.log("Seznam odzivov ", data);
          this.seznamOcen = data;
        }) ;
        this.presentAlert("Hvala za vaš odziv!");
      });
  };

  deleteOcena(ocena) {
    if (ocena.uporabnik_id != localStorage.getItem('id')) {
      console.log("Komentarja ne morete izbrisati!");
      this.presentAlert("Komentarja ne morete izbrisati! Izbrišete lahko le lastne komentarje!");
    } else {
      let index = this.seznamOcen.indexOf(ocena);

      if (index > -1) {
        this.seznamOcen.splice(index, 1);
      }
      this.oceneService.deleteReview(ocena.id);
      this.presentAlert("Komentar ste izbrisali!");
    }
  }

  presentAlert(text) {
    let alert = this.alertCtrl.create({
      //title: '',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  
  updateOcenaPage(restavracija, ocena) {
    console.log("update ocena", ocena)
    this.navCtrl.push(UrediOcenoPage, {
      restavracija: restavracija,
      ocena: ocena
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcenePage');
  }

}
