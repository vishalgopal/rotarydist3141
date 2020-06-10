import { LoaderService } from './../../service/loader.service';
import { Component, OnInit } from '@angular/core';
// Rest API
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../../environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
      searchTerm: any;
      clubId: any;
  constructor(private storage: Storage, private loader: LoaderService, private router: Router, private http: HttpClient ) { }
  userData;
  allUserData;
  ngOnInit() {
    this.storage.get('clubid').then((clbid) => {
      this.clubId = clbid;
      this.userGet();
      this.allUserGet();
    });
  }
  userGet() {
    // this.loader.showLoader();
    this.http.get(SERVER_URL + '/api/getclubofficebearers?clubid=' + this.clubId).subscribe((response: any) => {
    this.userData = response.sort(function(a, b){
      var nameA=a.name.first.toLowerCase(), nameB=b.name.first.toLowerCase();
      if (nameA < nameB) //sort string ascending
       return -1;
      if (nameA > nameB)
       return 1;
      return 0; //default return value (no sorting)
     });
    });
}
  allUserGet() {
    this.http.get(SERVER_URL + '/api/getclubmembers?clubid=' + this.clubId).subscribe((response: any) => {
    this.allUserData = response.sort(function(a, b){
      var nameA=a.name.first.toLowerCase(), nameB=b.name.first.toLowerCase();
      if (nameA < nameB) //sort string ascending
       return -1;
      if (nameA > nameB)
       return 1;
      return 0; //default return value (no sorting)
     });
    // this.loader.hideLoader();
    });
  }
  setFilteredItems() {
    console.log('search');
  }
}
