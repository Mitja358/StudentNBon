import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController  } from 'ionic-angular';
import { RestavracijeServiceProvider } from "../../providers/restavracije-service";
import { PodrobnostiPage } from '../../pages/podrobnosti/podrobnosti';
import {Http} from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-restavracije',
  templateUrl: 'restavracije.html',
})

export class RestavracijePage {
  
  private posts: any;
  private seznamRestavracij: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private loadingCtrl: LoadingController, private restavracijeService: RestavracijeServiceProvider) {
    this.getRestavracije();

    // Pokaži sporočila ob nalaganju
    let loadingPopup = this.loadingCtrl.create({
      content: 'Nalaganje restavracij...'
    });
  
    this.http.get('http://localhost:3000/restavracije/')
        .map(res => res.json()).subscribe(data => {this.posts = data;})
    this.initializeItems();

    // Skrij sporočilo 
    loadingPopup.dismiss();
  }

  getRestavracije(){
    //this.restavracijeService.getRestavracije().subscribe(data => console.log(data));
    this.restavracijeService.getRestavracije().subscribe(data => this.seznamRestavracij = data);
  }

  initializeItems() {
    this.seznamRestavracij = this.posts;
  }

  filter(ev) {
    // Resetiramo, da so ponovno generirane vse restavracije.
    this.initializeItems();

    // V spremenljivko val shranimo vrednos iz vnosnega polja (searchbar).
    let val = ev.target.value;

    // Če je v iskalno polje ni vnesena nobena vrednost, ne filtriramo restavracij. 
    if (val && val.trim() != '') {
      this.seznamRestavracij = this.seznamRestavracij.filter((restavracija) => {
        return (restavracija.naziv_restavracije.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
  //navCtrl --> prehajanje med stranmi
  podrobnostiRestavracije(restavracija){ 
    this.navCtrl.push(PodrobnostiPage, {
      restavracija: restavracija
    });
  }

/*NE DELUJOČE FILTRIRANJE
  filter2(originalData, query) {
    var filtered = [];
    var letterMatch = new RegExp(query, 'i');
    for (var i = 0; i < originalData.length; i++) {
      var restavracija = originalData[i];
      if (query) {
        if (letterMatch.test(restavracija.naziv_restavracije.substring(0, query.length))) {
          filtered.push(restavracija);
        }
      } else {
        filtered.push(restavracija);
      }
    }
    return filtered;
  };*/
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad RestavracijePage');
  }

};
