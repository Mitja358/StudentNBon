import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class AvtorizacijaServiceProvider {
  private url: string = "http://localhost:3000/";

  constructor(private http: Http) { }  

  public prijava(prijavni_podatki) {
    if (prijavni_podatki.upIme === null || prijavni_podatki.geslo === null) {
    } else {
        let body = {
          upIme: prijavni_podatki.upIme,
          geslo: prijavni_podatki.geslo
        };
        return this.http.post(this.url + 'uporabniki/prijava', body)
          .toPromise()
          .then(response => {
            if (response.json() != false) {
              localStorage.removeItem("uporabnik");
              let zapis = response.json();
              let filter = new Array();
              filter[0] = "id";
              filter[1] = "upIme";
              let besedilo = JSON.stringify(zapis, filter, "\t");
              localStorage.setItem("uporabnik", besedilo);
            } else { 
              // Naredi nekaj
             }
            return response.json()}, this.handleError);
    }
  }

  handleError(error) {
    console.log(error);
    return error.json().message || 'Server error.';
  }

  public registracija(registracijski_podatki) {
    if (registracijski_podatki.ime === null || registracijski_podatki.priimek === null || 
        registracijski_podatki.email === null || registracijski_podatki.upIme === null || 
        registracijski_podatki.geslo === null) {
    } else {
      let body = {
        ime: registracijski_podatki.ime,
        priimek: registracijski_podatki.priimek,
        email: registracijski_podatki.email,
        upIme: registracijski_podatki.upIme,
        geslo: registracijski_podatki.geslo
      };
      return this.http.post(this.url + 'uporabniki', body)
        .toPromise()
        .then(response => {
          console.log(response.json());
          return response.json()}, this.handleError); 
    }
  }
}
