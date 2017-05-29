import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController  } from 'ionic-angular';
import { RestavracijeServiceProvider } from "../../providers/restavracije-service";
import { PodrobnostiPage } from '../../pages/podrobnosti/podrobnosti';
import {Http} from '@angular/http';
import { OcenePage } from "../ocene/ocene";

/**
 * Generated class for the RestavracijePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restavracije',
  templateUrl: 'restavracije.html',
})

export class RestavracijePage {
  
  private mesto: any; 
  private posts: any;
  private seznamRestavracij: any;   

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private loadingCtrl: LoadingController, private restavracijeService: RestavracijeServiceProvider) {
    //this.mesto = this.navParams.get('mesto');
    this.getDefaults();
  
    // Pokaži sporočila ob nalaganju
    let loadingPopup = this.loadingCtrl.create({
      content: 'Nalaganje restavracij...'
    });

    this.http.get('http://localhost:3000/restavracije/kraj/' + this.mesto)
        .map(res => res.json()).subscribe(data => {this.posts = data;})

    this.initializeItems();

    // Skrij sporočilo 
    loadingPopup.dismiss();
  }

  getDefaults(){
    if(localStorage.getItem('mesto') != null){
      this.mesto = localStorage.getItem('mesto');
    } else{
      this.mesto = 'Maribor';
    } 
  }

  ngOnInit(){
    this.getRestavracije(this.mesto); 
  }

  spremeniMesto(){
    this.getRestavracije(this.mesto); 
  }

  getRestavracije(mesto){
    this.restavracijeService.getRestavracije(mesto).subscribe(data => this.seznamRestavracij = data);
  }

  //navCtrl --> prehajanje med stranmi
  podrobnostiRestavracije(restavracija){ 
    this.navCtrl.push(PodrobnostiPage, {
      restavracija: restavracija
    });
  }

  oceneRestavracij(restavracija){
    this.navCtrl.push(OcenePage, {
      restavracija: restavracija
    });
  }

  initializeItems() {
    this.seznamRestavracij = this.posts; 
    //this.getRestavracije(this.mesto);
  }

  filter(ev: any) {
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