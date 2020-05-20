import { Component, OnInit } from '@angular/core';
import { LoaderService } from './../../service/loader.service';
// Rest API
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SERVER_URL } from '../../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.page.html',
  styleUrls: ['./club-details.page.scss'],
})
export class ClubDetailsPage implements OnInit {
  items: any;
  userid: any;
  serverURL = SERVER_URL;
  username: any;
  public form: FormGroup;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }

  constructor(private loader: LoaderService, private _FB: FormBuilder, private router: Router, private http: HttpClient, private storage: Storage,
    public toastController: ToastController) { 
        this.form = this._FB.group({
          rotaryId: [''],
            donorRecognition: [''],
            clubName: [''],
            clubDesignation: [''],
            boardOfDirector: [''],
      });
  }
  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
      this.storage.get('userid').then((usrid) => {
        this.userid = usrid;
        this.userGet();
      });
  } 

  userGet() {
    this.http.get(SERVER_URL + '/api/getuser/' + this.userid)
    .subscribe((response: any) => {
      this.items = response[0];
      this.form.patchValue(this.items.rotaryDetails);
      console.log("userGet -> "+this.userid+" "+JSON.stringify(this.items));
      // console.log("ksj");
      this.loader.hideLoader();
    });
  } 

  submitUserDetails() {
    
    this.http.put(SERVER_URL + '/api/userUpdateClub/' + this.userid, this.form.value)
    .subscribe((responseCreate: any) => {
      //  this.http.put(SERVER_URL + '/api/UserImage/' + responseCreate, uploadData)
      //  .subscribe((responseUpdate: any) => {
        this.presentToast ('Data Updated Successfully!');
              console.log('Updated! '+this.userid);
        // });
    });
  }
}


