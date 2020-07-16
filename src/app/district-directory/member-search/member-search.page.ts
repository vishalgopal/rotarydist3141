import { Component, OnInit } from '@angular/core';
import { LoaderService } from './../../service/loader.service';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../../environments/environment';
import { LoadingController } from '@ionic/angular';
import { DataService } from "./data.service";

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.page.html',
  styleUrls: ['./member-search.page.scss'],
})
export class MemberSearchPage implements OnInit {
  searchTerm: any;
  clubId: any;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };

   userData;
   allUserData;
   public fileterData : any;
   searching: any = false;
   
constructor(private storage: Storage, private loader: LoaderService, private router: Router, private http: HttpClient, 
  public  loadingController : LoadingController,private dataService: DataService ) { }

ngOnInit() {
    
  this.storage.get('clubid').then((clbid) => {
    this.clubId = clbid;
    // this.allUserGet();
  }); 
}

// allUserGet() {
// this.http.get(SERVER_URL + '/api/allusers').subscribe((response: any) => {
// this.allUserData = response.sort(function(a, b){
//   var nameA=a.name.fullName.toLowerCase(), nameB=b.name.fullName.toLowerCase();
//   if (nameA < nameB) //sort string ascending
//    return -1;
//   if (nameA > nameB)
//    return 1;
//   return 0; //default return value (no sorting)
//  });
// // this.loader.hideLoader();
// });
// }

  setFilteredItems() 
  {
    this.searching = true;
    console.log(this.searchTerm)    
      this.fileterData = this.dataService.filterItems(this.searchTerm);
      
      this.searching = false;
  }

}
