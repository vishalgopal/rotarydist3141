import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, SERVER_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public items: any = [];

  constructor( private http: HttpClient) {
    this.http.get(SERVER_URL + '/api/allusers').subscribe((response: any) => {
      this.items =  response.sort(function(a, b){
        var nameA=a.name.fullName.toLowerCase(), nameB=b.name.fullName.toLowerCase();
        if (nameA < nameB) //sort string ascending
         return -1;
        if (nameA > nameB)
         return 1;
        return 0; //default return value (no sorting)
       });
      // // this.loader.hideLoader();
      });
  }

  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.name.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
