import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController  } from 'ionic-angular';

import { RestavracijeServiceProvider } from "../../providers/restavracije-service";
import { RestavracijePage } from '../../pages/restavracije/restavracije';
import { PrijavaPage } from '../../pages/prijava/prijava';
import { AvtorizacijaServiceProvider } from '../../providers/avtorizacija-service';

@IonicPage()
@Component({
  selector: 'page-nastavitve',
  templateUrl: 'nastavitve.html',
})

export class NastavitvePage {
  private mesto: any; 
  nastavitveOdjava = [];
  uporabnik: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private restavracijeService: RestavracijeServiceProvider, private avtorizacija: AvtorizacijaServiceProvider) {
    this.getDefaults();
    let pridobi = localStorage.getItem("uporabnik");
    let poljeObjektov = JSON.parse(pridobi);
    let uporabnik_local = poljeObjektov[0].upIme;
    this.uporabnik = {uporabnik_local};  
  }

  getDefaults(){
    if(localStorage.getItem('mesto') != null){
      this.mesto = localStorage.getItem('mesto');
    } else{
      this.mesto = 'Maribor';
    } 
  }

  setDefaults(){
    localStorage.setItem('mesto', this.mesto);
    this.navCtrl.push(RestavracijePage);
  }

  odjava() {
      localStorage.removeItem("uporabnik");
      this.navCtrl.push(PrijavaPage);
      console.log("Odjava");
  }
};