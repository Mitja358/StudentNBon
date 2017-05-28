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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, private oceneService: OceneServiceProvider) {
    this.restavracija = navParams.get('restavracija');
    this.getOcene(this.restavracija);
  }

  ocena = {datum: '', stOcena: '', komentar: '', vrstaOcena:'', restavracija_id: '', uporabnik_id: ''};

  getOcene(restavracija){
      this.oceneService.getOcene(restavracija).subscribe(data => this.seznamOcen = data);
  }

  //Dodajanje restavracije v bazo
  addOcena(ocena){
      console.log(this.ocena);  
      this.oceneService.addOcena(this.ocena); 
  };
  
  //Brisanje iz baze
  deleteOcena(ocena){
    let index = this.seznamOcen.indexOf(ocena);
    
      if(index > -1){
        this.seznamOcen.splice(index, 1);
      }   

    this.oceneService.deleteReview(ocena.id);
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcenePage');  
  }

}
