import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from '../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ToastController,LoadingController,AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userUID: any;
  // tslint:disable-next-line:no-inferrable-types
  public appID: string = '19737bb55d651b4';
  // tslint:disable-next-line:no-inferrable-types
  public apiKey: string = 'b64c4d5600659ced1ac6d990f581e331e751d040';

  // public appRegion: string = 'us';
  public fcmtoken:any;

  Login: any;
  stepOne = true;
  stepTwo = false;
  loginForm: FormGroup;
  userId: any;
  constructor(private http: HttpClient,
              private router: Router,
              private _FB: FormBuilder,
              public toastController: ToastController,
              private storage: Storage,
              private loadingController: LoadingController,
              public alertController: AlertController) 
  {
     this.loginForm = this._FB.group({
      mobile: ['', Validators.required],
      otp: ['', Validators.required],
    });

    this.storage.get('fcmtoken').then((token) => {
      if (token) {
      this.fcmtoken = token;
      }
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
     
    this.storage.get('username').then((usrid) => {
      if (usrid) {
      this.router.navigate(['/dashboard']);
      this.presentToast ('Login Successfull');
      }
    });
  }

  finduser() {
    this.http.put(SERVER_URL + '/api/finduser', this.loginForm.value)
    .subscribe(
      (responseCreate: any) => {
         this.stepOne = false;
         this.stepTwo = true;
         this.presentToast ('OTP Sent');
      },
      error => this.presentToast (error.error.message)
     );
  }

  validateuser() {
    this.http.put(SERVER_URL + '/api/validateuser', this.loginForm.value)
    .subscribe((responseCreate: any) => {
         this.stepOne = false;
         this.stepTwo = false;
         this.storage.set('clubid', responseCreate[0].club);
         this.storage.set('username', responseCreate[0].name.first + ' ' + responseCreate[0].name.last);
         this.storage.set('userid', responseCreate[0]._id);
         this.storage.set('district', responseCreate[0].district);
         this.storage.set('clubDesignation', responseCreate[0].rotaryDetails.clubDesignation);
         this.storage.set('districtDesignation', responseCreate[0].rotaryDetails.districtDesignation);
        //  this.storage.set('districtDesignation', 'member');
        this.userUID =  responseCreate[0].mobile;
        CometChat.login( responseCreate[0].mobile, this.apiKey).then(
          user => {
            console.log('Login Successful:', { user });
            // loading.dismiss();
            // this.router.navigate(['tabs']);
            // User loged in successfully.
          },
          error => {
            // loading.dismiss();
            console.log(error.message);
            // User login failed, check error and take appropriate action.
          }
        );

        console.log(responseCreate[0]._id);
         this.presentToast ('Login Successfull');
         const navigationExtras: NavigationExtras = {
          state: {
            userid: responseCreate[0]._id
          }
        };
        this.success("The Site is owned and operated by Rotary District 3141. As a part of supporting our Rotarian members who are doing selfless service to the humanity and promoting Rotary objective, we are making our site available to Rotarians and entities in which they may have business interest. Our merchant network available on the Site including Rotary District 3141 App is solely a facilitator of communications between the merchant members and users. Unless expressly stated otherwise on the Site or the Rotary District 3141 App, the goods and services which are offered, provided, sold and delivered by the merchant members and not us. We (Rotary District 3141 and the officers thereof) are in no way responsible for the quality of goods or services offered by the merchant members or in regard to payment (by way of advance or otherrwise) made by the users. All questions regarding merchant members’ listed on the site and/or products and/or services featured on the Site and the Rotary District 3141 App should be directed to the appropriate merchant members.");
  
         this.router.navigate(['/dashboard'], navigationExtras);
     },
     error => this.presentToast (error.error.message)
    );
  }

  async success(msg) {
    console.log('done');
    const alert = await this.alertController.create({
      header: '',
      // subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


}
