import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

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
  private url: string = "http://localhost:3000/uporabniki";
  seznamUporabnikov = [];

  constructor(private http: Http) {
    this.getEmail();
    this.getGeslo();
  }

  getEmail(){
    return this.http.get(this.url)
    .map(this.extractData)
    .do(this.logResponse)
    .catch(this.catchError);
  }

  getGeslo(){
    return this.http.get(this.url)
    .map(this.extractData2)
    .do(this.logResponse)
    .catch(this.catchError);
  }

  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || "Server error.");
  }

  private logResponse(res: Response) {
    console.log(res);
  }

  private extractData(res: Response) {
    let podatki = res.json();
    let podatki2 = podatki[0].email;
    return podatki2;
  }

  private extractData2(res: Response) {
    let podatki = res.json();
    let podatki2 = podatki[0].geslo;
    return podatki2;
  }

  public prijava(prijavni_podatki) {
    if (prijavni_podatki.email === null || prijavni_podatki.geslo === null) {
      // Observable lahko nadomestijo HTTP klici 
      return Observable.throw("Prosimo vnesite podatke za prijavo");
    } else {
      return Observable.create(observer => {
        //this.seznamUporabnikov = data
        this.getEmail().subscribe(data => {
          this.seznamUporabnikov = data
          let nekaj = data;
          console.log("MAIL: " + this.seznamUporabnikov);

        // Implementacija realnega preverjanja (store a token?)
        let dostop = (prijavni_podatki.geslo === "geslo" && prijavni_podatki.email === this.seznamUporabnikov);
      
        this.trenutniUporabnik = new Uporabnik('Mitja', 'mitja.bernjak@gmail.com');
        observer.next(dostop);
        observer.complete();
        })
      });
    }
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
