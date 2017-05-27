import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { OceneServiceProvider } from "../../providers/ocene-service";

/**
 * Generated class for the OcenePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ocene',
  templateUrl: 'ocene.html',
})

export class OcenePage {
  restavracija: any; 
  seznamOcen = []; 

  novaOcena = {uporabnik_id: '', komentar: '', stOcena: '' };
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, private oceneService: OceneServiceProvider) {
    this.restavracija = navParams.get('restavracija');
    this.getOcene(this.restavracija);
  }

  getOcene(restavracija){
      this.oceneService.getOcene(restavracija).subscribe(data => this.seznamOcen = data);
  }

  addOcena() {   
    console.log(this.novaOcena); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcenePage');
  }

}
