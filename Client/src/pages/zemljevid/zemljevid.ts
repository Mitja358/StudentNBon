import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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
  trenutnaLokacija_lat: number;
  trenutnaLokacija_lng: number;
  koncnaLokacija_lat: string;
  koncnaLokacija_lng: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private geolocation: Geolocation) {
    this.restavracija = navParams.get('restavracija');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZemljevidPage');
    this.initMap();
  }

  initMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.trenutnaLokacija_lat = position.coords.latitude;
      this.trenutnaLokacija_lng = position.coords.longitude;
      console.log("TRENUTNA: " + this.trenutnaLokacija_lat);
    }, (err) => {
      console.log('Napaka pri pridobivanju trenutne lokacije.', err);
    });

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    let mapOptions = {
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.geocoder.geocode ({ 'address' : this.restavracija.naslov + ', ' + this.restavracija.mesto }, (destinations, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.map.setCenter(destinations[0].geometry.location);
        this.koncnaLokacija_lat = destinations[0].geometry.location.lat();
        var primer = destinations[0].geometry.location.lat();
        this.koncnaLokacija_lng = destinations[0].geometry.location.lng();
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
      calculateAndDisplayRoute(directionsService, directionsDisplay, this.restavracija.naslov, this.restavracija.mesto, this.trenutnaLokacija_lat, this.trenutnaLokacija_lng, this.koncnaLokacija_lat, this.koncnaLokacija_lng);
    });

    function calculateAndDisplayRoute(directionsService, directionsDisplay, naslov, mesto, trenutnaLokacija_lat, trenutnaLokacija_lng, koncnaLokacija_lat, koncnaLokacija_lng) {
      console.log("LAT: " + trenutnaLokacija_lat);
      console.log("LNG: " + trenutnaLokacija_lng);

      directionsService.route({
        origin: {lat: trenutnaLokacija_lat, lng: trenutnaLokacija_lng},
        destination: {lat: koncnaLokacija_lat, lng: koncnaLokacija_lng},
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          alert('Napaka pri pridobivanju napotkov. Koda napake: ' + status);
        }
      });
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    directionsDisplay.setMap(this.map);
  }
}
