import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

export class Uporabnik {
  ime: string;
  email: string;

  constructor(ime: string, email: string) {
    this.ime = ime;
    this.email = email;
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
    if (prijavni_podatki.email === null || prijavni_podatki.geslo === null) {
      // Observable lahko nadomestijo HTTP klici 
     // return Observable.throw("Prosimo vnesite podatke za prijavo");
    } else {
        let headers = new Headers({
          'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
          headers: headers
        });
        let body = {
          email: prijavni_podatki.email,
          geslo: prijavni_podatki.geslo
        };
        return this.http.post(this.url + 'uporabniki/prijava', body)
          .toPromise()
          .then(response => {
            console.log(response.json());
            if (response.json() == true) {
              localStorage.removeItem("email");
              localStorage.removeItem("geslo");
              localStorage.email = prijavni_podatki.email;
              localStorage.geslo = prijavni_podatki.geslo;
            } else { 
              // Naredi nekaj
             }
            return response.json()}, this.handleError);


//**************** RAZBIJ NA 2 FUNKCIJI!!! */
          // Implementacija realnega preverjanja (store a token?)
        /*
        let dostop = (prijavni_podatki.geslo === "geslo" && prijavni_podatki.email === "email");
      
        this.trenutniUporabnik = new Uporabnik('Mitja', 'mitja.bernjak@gmail.com');
        observer.next(dostop);
        observer.complete();
        */
    }
  }

  handleError(error) {
    console.log(error);
    return error.json().message || 'Server error.';
  }

  public registracija(registracijski_podatki) {
    if (registracijski_podatki.email === null || registracijski_podatki.geslo === null) {
      return Observable.throw("Prosimo vnesite podatke za registracijo");
    } else {
      return Observable.create(observer => {
        // Implementacija realnega vnosa s POST-om
        observer.next(true);
        observer.complete();
      });
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

/*
  prijava(){
    // Asinhrona funkcija
    return new Promise((resolve) => {
      setTimeout(() => {
        // Tu preveriš na serverju ali je prijava ustrezna
        resolve(false);
      }, 1000);
    });
  }
  */
}
