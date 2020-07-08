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
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };
constructor(private storage: Storage, private loader: LoaderService, private router: Router, private http: HttpClient, public  loadingController : LoadingController ) { }
userData;
allUserData;
async ngOnInit() {
  const loading = await this.loadingController.create({
    message: 'Please Wait',
    spinner: 'dots',
    translucent: true
  });
  loading.present()
this.storage.get('clubid').then((clbid) => {
  this.clubId = clbid;
  this.allUserGet();
  loading.dismiss();
});
}
allUserGet() {
this.http.get(SERVER_URL + '/api/allusers').subscribe((response: any) => {
this.allUserData = response.sort(function(a, b){
  var nameA=a.name.fullName.toLowerCase(), nameB=b.name.fullName.toLowerCase();
  if (nameA < nameB) //sort string ascending
   return -1;
  if (nameA > nameB)
   return 1;
  return 0; //default return value (no sorting)
 });
// this.loader.hideLoader();
});
}

setFilteredItems() 
{
  console.log(this.searchTerm)
  this.allUserData = this.allUserData.filter(item => {
    // console.log(item.name.fullName+" "+item._id);
    return item.name.fullName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
  });
}

}
