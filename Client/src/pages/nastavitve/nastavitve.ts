import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController  } from 'ionic-angular'; //AlertController
import { RestavracijeServiceProvider } from "../../providers/restavracije-service";
import { RestavracijePage } from '../../pages/restavracije/restavracije';

@IonicPage()
@Component({
  selector: 'page-nastavitve',
  templateUrl: 'nastavitve.html',
})

export class NastavitvePage {
  
  private mesto: any; 
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private restavracijeService: RestavracijeServiceProvider) {
    this.getDefaults();  
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

};