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
    return this.http.get(this.url + "restavracijaOcena/" + restavracija.id)
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

  addOcena(data) { 
      let body = JSON.stringify(data);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.url, body, options)
        .map(res=> {return res.json();});
  }

  updateOcena(data, id) { 
      let body = JSON.stringify(data);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.put(this.url + id, body, options)
        .map(res=> res.json())
        .subscribe(data => {
          console.log(data);
        }, error => {
            console.log("Oooops!");
        });
  }
  
  deleteReview(id){ 
    this.http.delete(this.url + id).subscribe((res) => {
      console.log(res.json());
    });    
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