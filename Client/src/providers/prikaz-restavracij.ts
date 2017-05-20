import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the PrikazRestavracijProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PrikazRestavracij {

  private url: string = "http://localhost:3000/restavracije";

  constructor(public http: Http) {
    console.log('Hello PrikazRestavracij');
  }
  getRestaurants(){
    return this.http.get(this.url)
    .map(this.extractData)
    .do(this.logResponse)
    .catch(this.catchError);
  }

  private catchError(error: Response | any){
    console.log(error);
    return Observable.throw(error.json().error || "Server error.");
  }

  private logResponse(res: Response){
    console.log(res);
  }

  private extractData(res: Response){
    return res.json();
  }
}