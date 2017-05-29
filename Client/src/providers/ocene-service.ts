import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
 
@Injectable()
export class OceneServiceProvider {

  private url: string = "http://localhost:3000/ocene/";

  constructor(public http: Http) {
    console.log('Hello OceneServiceProvider Provider');
  }

  getOcene(restavracija){
    return this.http.get(this.url + "restavracija/" + restavracija.id)
    .do(this.logResponse)
    .map(this.extractData)
    .do(this.logResponse) 
    .catch(this.catchError)
  }

  getPovprecnoOceno(restavracija){
    return this.http.get(this.url + "povprecnaOcena/" + restavracija.id)
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
  }
  
  deleteReview(id){ 
    this.http.delete('http://localhost:3000/ocene/' + id).subscribe((res) => {
      console.log(res.json());
    });    
  }
 
}