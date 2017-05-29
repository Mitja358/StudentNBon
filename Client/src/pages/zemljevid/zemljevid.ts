import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;

/**
 * Generated class for the ZemljevidPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-zemljevid',
  templateUrl: 'zemljevid.html',
})

export class ZemljevidPage {
  restavracija: any;
  geocoder = new google.maps.Geocoder();

  // Referenca mapElement na map div značko v HTML
  @ViewChild('map') mapElement;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.restavracija = navParams.get('restavracija');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZemljevidPage');
    this.initMap();
  }

  initMap() {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let mapOptions = {
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    directionsDisplay.setMap(this.map);

    calculateAndDisplayRoute(directionsService, directionsDisplay, this.restavracija.naslov, this.restavracija.mesto);

    function calculateAndDisplayRoute(directionsService, directionsDisplay, naslov, mesto) {
      directionsService.route({
        origin: 'Murska Sobota',
        destination: naslov + mesto,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          alert('Napaka pri pridobivanju napotkov. Koda napake: ' + status);
        }
      });
    }

    this.geocoder.geocode ({ 'address' : this.restavracija.naslov + ', ' + this.restavracija.mesto }, (destinations, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.map.setCenter(destinations[0].geometry.location);
        let marker = new google.maps.Marker({
          map: this.map,
          position: destinations[0].geometry.location
        });

        let label = new google.maps.InfoWindow({
          content: "<b>Naziv:</b> " + this.restavracija.naziv_restavracije + "<br /><b>Naslov:</b> " +
          this.restavracija.naslov + ", " + this.restavracija.mesto + "<br /><b>Vrednost obroka:</b> " +
          this.restavracija.vrednostObroka + " €<br /><b>Vrednost doplačila:</b> " + this.restavracija.vrednostDoplacila + " €"
        });

        marker.addListener('click', function() {
          label.open(this.map, marker);
        });
      } else {
        alert ('Geolokator ni mogel najti tega naslova. Koda napake: ' + status);
      }
    });
  }
}
