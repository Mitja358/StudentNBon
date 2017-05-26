import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { RestavracijePage } from '../pages/restavracije/restavracije';
import { PodrobnostiPage } from '../pages/podrobnosti/podrobnosti';
import { NastavitvePage } from '../pages/nastavitve/nastavitve';
import { OcenePage } from "../pages/ocene/ocene";
import { ZemljevidPage } from "../pages/zemljevid/zemljevid";
import { PrijavaPage } from '../pages/prijava/prijava';
import { TabsPage } from '../pages/tabs/tabs';

import { RestavracijeServiceProvider } from '../providers/restavracije-service';
import { MenijiServiceProvider } from '../providers/meniji-service';
import { OceneServiceProvider } from '../providers/ocene-service';
import { VrstaMenijaServiceProvider } from '../providers/vrstamenija-service';
import { AvtorizacijaServiceProvider } from '../providers/avtorizacija-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RestavracijePage, 
    PodrobnostiPage,
    NastavitvePage,
    OcenePage,
    ZemljevidPage,
    PrijavaPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RestavracijePage,
    PodrobnostiPage,
    NastavitvePage,
    OcenePage,
    ZemljevidPage,
    PrijavaPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestavracijeServiceProvider,
    MenijiServiceProvider,
    VrstaMenijaServiceProvider,
    OceneServiceProvider,
    AvtorizacijaServiceProvider
  ]
})
export class AppModule {}
