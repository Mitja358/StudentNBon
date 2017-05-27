import { Injectable } from '@angular/core';
import { Http, Response, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
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

}