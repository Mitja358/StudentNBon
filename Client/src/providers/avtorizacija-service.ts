import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

export class Uporabnik {
  ime: string;
  upIme: string;

  constructor(ime: string, upIme: string) {
    this.ime = ime;
    this.upIme = upIme;
  }
}

/*
  Generated class for the AvtorizacijaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AvtorizacijaServiceProvider {
  trenutniUporabnik: Uporabnik;
  private url: string = "http://localhost:3000/";

  constructor(private http: Http) { }  

  public prijava(prijavni_podatki) {
    if (prijavni_podatki.upIme === null || prijavni_podatki.geslo === null) {
      // Observable lahko nadomestijo HTTP klici 
    } else {
        let headers = new Headers({
          'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
          headers: headers
        });
        let body = {
          upIme: prijavni_podatki.upIme,
          geslo: prijavni_podatki.geslo
        };
        return this.http.post(this.url + 'uporabniki/prijava', body)
          .toPromise()
          .then(response => {
            let x = response.json()[0];
            console.log(response.json());
            if (response.json() != false) {
              localStorage.removeItem("id");
              localStorage.removeItem("upIme");
              localStorage.id = response.json()[0].id;
              localStorage.upIme = prijavni_podatki.upIme;
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
      //return Observable.throw("Prosimo vnesite podatke za registracijo");
    } else {
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({
        headers: headers
      });
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

  public pridobiPodatkeUporabnika() : Uporabnik {
    return this.trenutniUporabnik;
  }

  public odjava() {
    return Observable.create(observer => {
      this.trenutniUporabnik = null;
      observer.next(true);
      observer.complete();
    });
  }
}
