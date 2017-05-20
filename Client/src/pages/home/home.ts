import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PrikazRestavracij } from '../../providers/prikaz-restavracij';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  restaurantsList = [];

  constructor(private prikazRestavracij: PrikazRestavracij) {
    this.getRestaurants();
  }
  getRestaurants() {
    this.prikazRestavracij.getRestaurants().subscribe(data => this.restaurantsList = data);
  }
}
