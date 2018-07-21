import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AlergiaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlergiaProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AlergiaProvider Provider');
  }

}
