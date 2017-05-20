import { Component } from '@angular/core';
/*
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home'; 
*/
import { AboutPage } from '../about/about';
import { RestavracijePage } from '../restavracije/restavracije';
import { NastavitvePage } from '../nastavitve/nastavitve';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RestavracijePage;
  tab2Root = NastavitvePage;
  tab3Root = AboutPage;
  /*
  tab2Root = HomePage;
  tab4Root = ContactPage;
  */

  constructor() {

  }
}
