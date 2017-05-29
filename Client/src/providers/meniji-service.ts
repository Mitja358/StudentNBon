import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenijiServiceProvider {

  private url: string = "http://localhost:3000/meniji/restavracija";
  
  constructor(public http: Http) {
    console.log('Hello MenijiServiceProvider Provider');
  }

  getMenije(restavracija){
    return this.http.get(this.url + "/" + restavracija.id)
    .do(this.logResponse)
    .map(this.extractData) 
    .do(this.logResponse) 
    .catch(this.catchError)
  }

  getTipPrehrane(restavracija){
    return this.http.get(this.url + "/" + restavracija.id + "/vrstaMenija")
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
