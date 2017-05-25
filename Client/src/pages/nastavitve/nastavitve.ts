import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RestavracijeServiceProvider } from "../../providers/restavracije-service";

/**
 * Generated class for the NastavitvePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nastavitve',
  templateUrl: 'nastavitve.html',
})
export class NastavitvePage {

    kraj: any;
    /*tipHrane: any;
    ocena: any;
    cena: any;*/

  constructor(public navCtrl: NavController, public navParams: NavParams, private restavracijeService: RestavracijeServiceProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.kraj = 'Maribor';
    /*
    this.tipHrane = 'hitraHrana';
    this.ocena = 5;
    this.cena =1;
    */ 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NastavitvePage');
  }

  findRestaurant(){
    let loading = this.loadingCtrl.create({        
      content: "Iskanje restavracij..."
    });

    loading.present();

    let options = {
      kraj: this.kraj/*,
      tipHrane: this.tipHrane,
      ocena: this.ocena,
      cena: this.cena*/
    };

    /*this.restavracijeService.getRestavracije(options).then((data)=> {
      loading.dismiss();
            if(typeof(data[0]) === "undefined"){
                let alert = this.alertCtrl.create({
                    title: 'Oops!',
                    subTitle: 'Sorry, no RESTAURANTS could be found for your search criteria.',
                    buttons: ['Ok']
                });
 
                alert.present();
            } else {
                this.nav.push(RestavracijePage, {
                    rooms: data,
                    details: options
                });
            }
        }, (err) => {
            console.log(err);
    })*/

  }

}