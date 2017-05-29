import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable} from 'rxjs/Observable';


import 'rxjs/Rx';
 

/*
  Generated class for the MenijiServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class OceneServiceProvider {

  private url: string = "http://localhost:3000/ocene/restavracija";

  constructor(public http: Http) {
    console.log('Hello OceneServiceProvider Provider');
  }

  getOcene(restavracija){
    return this.http.get(this.url + "/" + restavracija.id)
    .do(this.logResponse)
    .map(this.extractData)
    .do(this.logResponse) 
    .catch(this.catchError)
  }
  
  private catchError(error: Response | any){
    console.log(error);
    return Observable.throw(error.json().error || "Server error");
  }

  private logResponse(res: Response){
    console.log(res);
  }

  private extractData(res:Response){
    return res.json();
  }

addOcena(data) { 
  //if (data.datum === null || data.stOcena === null || data.komentar === null || data.vrstaOcena === null || data.restavracija_id === null || data.uporabnik_id === null) {
    //console.log("Vnesite vse podatke!");
  //} else {
      let body = JSON.stringify(data);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:3000/ocene', body, options)
        .map(res=> res.json())
        .subscribe(data => {
          console.log(data);
        }, error => {
            console.log("Oooops!");
        });
    //}
  }
  
deleteReview(id){ 
  this.http.delete('http://localhost:3000/ocene/' + id).subscribe((res) => {
    console.log(res.json());
  });    
}
 
}