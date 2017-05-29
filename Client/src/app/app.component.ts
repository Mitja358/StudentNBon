import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PrijavaPage } from '../pages/prijava/prijava';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  // Pri zagonu aplikacije se pokaže ta stran (trenutno je prazna stran)
  rootPage:any = PrijavaPage; 
  //rootPage:any = TabsPage; 
  //loader: any;

/*
  constructor(public avtorizacija: AvtorizacijaProvider, public loadingController: LoadingController) {
    this.presentLoading();    

    // Sinhrona funkcija, saj se zanašamo na promise in ne čakamo
    this.avtorizacija.prijava().then((isLoggedIn) => {
      if(isLoggedIn){
        this.rootPage = TabsPage;
      } else {
        this.rootPage = PrijavaPage;
      }
      this.loader.dismiss();
    });
  }

  presentLoading() {
    this.loader = this.loadingController.create({
      content: "Preverjam prijavo ..."
    });
    this.loader.present();
  }
*/
>>>>>>> 0d269127fa1c77e2b8b83521637f1fe06d0a9b69

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
