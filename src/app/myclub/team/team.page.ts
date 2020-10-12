import { LoaderService } from './../../service/loader.service';
import { Component, OnInit } from '@angular/core';
// Rest API
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../../environments/environment';

import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  serverURL=SERVER_URL;
      searchTerm: any;
      clubId: any;
  constructor(private storage: Storage, private loader: LoaderService, private router: Router, 
    private http: HttpClient,
    public toastController: ToastController, ) { }
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

  sendInvitation(mobile)
  {
    console.log(mobile); 
    const mobilepattern = /[6789][0-9]{9}$/;
      if (mobilepattern.test(mobile)) 
      {
        var data = {'mobile' : mobile};
        console.log(data); 
        this.http.put(SERVER_URL + '/api/sendInvitation', data)
        .subscribe(
          (responseCreate: any) => {
            this.presentToast ('Invitation Sent');
          },
          error => this.presentToast (error.error.message)
        );
      }
      else{
        this.presentToast("Uh-oh! Please check the phone number.");
      }    
  }

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
