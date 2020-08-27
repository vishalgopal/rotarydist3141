import { SERVER_URL } from './../../../environments/environment';
import { LoaderService } from './../../service/loader.service';
import { Component, OnInit } from '@angular/core';
// Rest API
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.page.html',
  styleUrls: ['./team-details.page.scss'],
})
export class TeamDetailsPage implements OnInit {
  serverURL = SERVER_URL;
  userId: string;
  curruserId;
  userData: any = [];
  response = {};
  loaderToShow: any;
  responseData;
  username;
  isNetworking;
  isConnected;
  status;
  familyData;
  notConnectedMsg = "not connected";
  constructor(
    public toastController: ToastController,
    private storage: Storage,
    private loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) {
     }
     async presentToast(msg: any) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }
  ngOnInit() {
    // this.loader.showLoader();
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.storage.get('userid').then((usrid) => {
      this.curruserId = usrid;
      this.userGet();
    });
    this.storage.get('username').then((usrnm) => {
      this.username = usrnm;
    });
  }
  userGet() {
    this.http.get(SERVER_URL + '/api/user/' + this.userId + '/' + this.curruserId).subscribe((response: any) => {
    this.userData = response[0];
    console.log(this.userData);
    this.familyData = this.userData.familyDetails ? true : false;
    if (this.userData.networking) {
    this.isNetworking = this.userData.networking.length > 0 ? true : false;
    if (this.isNetworking) {
      this.isConnected = this.userData.networking[0].status === 'connected' ? true : false;
      this.status = this.userData.networking[0].status;
    }
    console.log('isnetworking ' + this.isNetworking);
    console.log('isconnected ' + this.isConnected);
  } else {
    this.isNetworking = false;
    this.isConnected = false;
    this.status = '';
  }

    });
}
  sendRequest(userData, status) {
    this.responseData = {
      username: this.username,
      name : userData.name.first + ' ' + userData.name.last,
      id: this.curruserId,
      status: status
    };
    this.http.put(SERVER_URL + '/api/networking/' + this.userId, this.responseData).subscribe((response: any) => {
    // this.userData = response[0];
    // this.loader.hideLoader();
    if (status === 'pending') {
    this.isNetworking = true;
    this.status = 'requestReceived';
    this.presentToast ('Request Sent');
    } else if(status === 'accept') {
        this.isNetworking = true;
        this.status = 'accept';
        this.isConnected = true;
        this.presentToast ('You are now connected');
      } else if (status === 'deny') {
        this.isNetworking = true;
        this.status = 'requestRejected';
        this.presentToast ('Request Denied');
      }
    });
}
}
