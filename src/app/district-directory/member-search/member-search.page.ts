import { Component, OnInit } from '@angular/core';
import { LoaderService } from './../../service/loader.service';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../../environments/environment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.page.html',
  styleUrls: ['./member-search.page.scss'],
})
export class MemberSearchPage implements OnInit {
  searchTerm: any;
  clubId: any;
   serverURL = SERVER_URL;
   userData;
   allUserData;
   public jsonData : any;
   searching: any = false;
   
constructor(private storage: Storage, private loader: LoaderService, private router: Router, private http: HttpClient, 
  public  loadingController : LoadingController) { }

ngOnInit() {
    
  this.storage.get('clubid').then((clbid) => {
    this.clubId = clbid;
  }); 
  this.userGet();
}
  // setFilteredItems() 
  // {
  //   this.searching = true;
  //   console.log(this.searchTerm)    
  //     this.fileterData = this.dataService.filterItems(this.searchTerm);
      
  //     this.searching = false;
  // }
  userGet() {
    // this.loader.showLoader();
    this.http.get(SERVER_URL + '/api/allusers').subscribe((response: any) => {
    this.userData = response.sort(function(a, b){
      var nameA=a.name.fullName.toLowerCase(), nameB=b.name.fullName.toLowerCase();
      if (nameA < nameB) //sort string ascending
       return -1;
      if (nameA > nameB)
       return 1;
      return 0; //default return value (no sorting)
     });;
    this.jsonData = response.sort(function(a, b){
      var nameA=a.name.fullName.toLowerCase(), nameB=b.name.fullName.toLowerCase();
      if (nameA < nameB) //sort string ascending
       return -1;
      if (nameA > nameB)
       return 1;
      return 0; //default return value (no sorting)
     });;
    // this.loader.hideLoader();
    });
  }
  setFilteredItems() {
    this.userData = this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    return this.jsonData.filter(item => {
      // console.log(item.name.fullName+" "+item._id)
      return item.name.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
