import { LoaderService } from './../../service/loader.service';
import { Component, OnInit } from '@angular/core';
// Rest API
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../../environments/environment';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController,Platform} from '@ionic/angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
      serverURL = SERVER_URL;
      searchTerm: any;
      clubId: any;
  constructor(private storage: Storage, private loader: LoaderService, private router: Router, 
    private http: HttpClient,private socialSharing: SocialSharing, public toastController: ToastController) { }
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
  setFilteredItems() {
    console.log(this.searchTerm)
    if(this.searchTerm != '')
    {
    this.allUserData = this.allUserData.filter(item => {
        // console.log(item.name.fullName);
        return item.name.fullName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    }
    else{
      this.allUserGet();
    }
    if(this.searchTerm != '')
    {
      this.userData = this.userData.filter(item => {
        // console.log(item.name.fullName);
        return item.name.fullName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    }
    else{
      this.userGet();
    }
  }
  shareOnWhatsApp()
  {
    console.log("in function WA share")
    var text = "Join Rotary District 3141 App using this link 'https://play.google.com/store/apps/details?id=org.digit9.rotary&hl=en'"
    this.socialSharing.shareViaWhatsApp(text, null, null).then((res) => {
      this.presentToast("Invitation sent.")
    }).catch((e) => {
      this.presentToast("Invitation not sent. Plaese try again.")
    });
  }
  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }
}
