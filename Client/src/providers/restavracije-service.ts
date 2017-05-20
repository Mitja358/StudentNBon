import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RestavracijeServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestavracijeServiceProvider {

  private url: string = "http://localhost:3000/restavracije/";

  constructor(private http: Http) {
    console.log('Hello RestavracijeServiceProvider Provider');
  }

  getRestavracije(){
    return this.http.get(this.url)
    .do(this.logResponse) //.do((res: Response) => console.log(res))
    .map(this.extractData) //.map((res: Response) => res.json());
    .do(this.logResponse) //.do((res: Response) => console.log(res))
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
