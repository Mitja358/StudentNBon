import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, private oceneService: OceneServiceProvider, private alertCtrl: AlertController) {
    this.restavracija = navParams.get('restavracija');
    this.getOcene(this.restavracija);

    let id = localStorage.getItem('id');

    function getDatum() {
      var date = new Date();
      var datumNow = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
      return datumNow;
    }

    let idRestavracije = this.restavracija.id;

    this.ocena = {datum: getDatum(), stOcena: '', komentar: '', vrstaOcena:'', restavracija_id: idRestavracije, uporabnik_id: id};
  }

  getOcene(restavracija){
      this.oceneService.getOcene(restavracija).subscribe(data => this.seznamOcen = data);
  }

  addOcena(ocena, restavracija){
      //console.log(this.ocena);  
      this.oceneService.addOcena(this.ocena); 
      this.presentAlert("Hvala za vaš odziv!");
      this.getOcene(this.restavracija); 
      this.getOcene(this.restavracija);
  };

  deleteOcena(ocena){
    if(ocena.uporabnik_id != localStorage.getItem('id')){ 
      console.log("Komentarja ne morete izbrisati!"); 
      this.presentAlert("Komentarja ne morete izbrisati! Izbrišete lahko le lastne komentarje!"); 
    }else{
    let index = this.seznamOcen.indexOf(ocena);
    
      if(index > -1){
        this.seznamOcen.splice(index, 1);
      }   

    this.oceneService.deleteReview(ocena.id);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcenePage');  
  }

}
