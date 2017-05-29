import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { OceneServiceProvider } from "../../providers/ocene-service";


@IonicPage()
@Component({
  selector: 'page-ocene',
  templateUrl: 'ocene.html',
})

export class OcenePage {
  restavracija: any; 
  seznamOcen = [];
  ocena : any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, private oceneService: OceneServiceProvider) {
    this.restavracija = navParams.get('restavracija');
    this.getOcene(this.restavracija);
    //this.getRestavracijaId(this.restavracija); 
    //this.getUporabnik(); 

    let upIme = localStorage.getItem('upIme');

    function getDatum() {
      var date = new Date();
      var datumNow = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
      return datumNow;
    }

    let idRestavracije = this.restavracija.id; 

    this.ocena = {datum: getDatum(), stOcena: '', komentar: '', vrstaOcena:'', restavracija_id: idRestavracije, uporabnik_id: '1'};
  }

  getOcene(restavracija){
      this.oceneService.getOcene(restavracija).subscribe(data => this.seznamOcen = data);
  }

  /* getRestavracijaId(restavracija){
    console.log(restavracija.id); 
    return restavracija.id; 
  }

  getUporabnik(){
    let upIme = localStorage.getItem('upIme');
  }*/

  addOcena(ocena, restavracija){
      console.log(this.ocena);  
      this.oceneService.addOcena(this.ocena); 
      this.getOcene(this.restavracija);
  };

 
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
