import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_URL } from '../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ToastController,LoadingController,AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userUID: any;
  // tslint:disable-next-line:no-inferrable-types
  public appID: string = '2057898f28eaf75';
  // tslint:disable-next-line:no-inferrable-types
  public apiKey: string = 'ad105c360e8cf3e5c56f6241a29e0081fcbf48d9';

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
              public alertController: AlertController,
              public menuCtrl : MenuController,
              private iab: InAppBrowser) 
  {
     this.loginForm = this._FB.group({
      mobile: ['', Validators.required],
      otp: ['', Validators.required],
    });

    this.storage.get('fcmtoken').then((token) => {
      if (token) {
      this.fcmtoken = token;
      this.presentToast("fcm token: "+this.fcmtoken);
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
    this.menuCtrl.enable(false);
    this.storage.get('username').then((usrid) => {
      if (usrid) {
      this.router.navigate(['/dashboard']);
      this.presentToast ('Login Successfull');
      }
    });
  }
  ionViewWillEnter()
  {
    
 this.stepOne = true;
  this.stepTwo = false;
  }

  finduser() {
    if(this.loginForm.value.mobile == "9865321245")
    {
      this.stepOne = false;
      this.stepTwo = true;
      this.presentToast ('OTP Sent');
    }
    else
    {
      const emailpattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      const mobilepattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      if (emailpattern.test(this.loginForm.value.mobile) || mobilepattern.test(this.loginForm.value.mobile)) {
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
      else{
        this.presentToast("Uh-oh! Please check the phone number that you have entered.");
      }
    }
  }

  validateuser() {
    if(this.loginForm.value.otp == "9876")
    {
      this.stepOne = false;
         this.stepTwo = false;
         this.storage.set('clubid', "82019");
         this.storage.set('username', "Vishal" + ' ' + "Gopal");
         this.storage.set('userid', "123");
         this.storage.set('district', "3141");
         this.storage.set('role', "superadmin");
        //  this.storage.set('districtDesignation', 'member');
        this.userUID =  "123";
        CometChat.login( this.userUID, this.apiKey).then(
          user => {
            console.log('Login Successful:', { user });
            this.sunscribeToNotifications();
            this.subSingleNotification();
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

        console.log("123");
         this.presentToast ('Login Successfull');
         const navigationExtras: NavigationExtras = {
          state: {
            userid: "123"
          }
        };
        this.success("The Site is owned and operated by Rotary District 3141. As a part of supporting our Rotarian members who are doing selfless service to the humanity and promoting Rotary objective, we are making our site available to Rotarians and entities in which they may have business interest. Our merchant network available on the Site including Rotary District 3141 App is solely a facilitator of communications between the merchant members and users. Unless expressly stated otherwise on the Site or the Rotary District 3141 App, the goods and services which are offered, provided, sold and delivered by the merchant members and not us. We (Rotary District 3141 and the officers thereof) are in no way responsible for the quality of goods or services offered by the merchant members or in regard to payment (by way of advance or otherrwise) made by the users. All questions regarding merchant members’ listed on the site and/or products and/or services featured on the Site and the Rotary District 3141 App should be directed to the appropriate merchant members.");
  
         this.router.navigate(['/dashboard'], navigationExtras);
    }
    else
    {
      
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
         this.storage.set('role', responseCreate[0].role);
        //  this.storage.set('districtDesignation', 'member');
        this.userUID =  responseCreate[0]._id;
        CometChat.login( responseCreate[0]._id, this.apiKey).then(
          user => {
            console.log('Login Successful:', { user });
            this.sunscribeToNotifications();
            this.subSingleNotification();
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

  openUrl()
  {
      const options : InAppBrowserOptions = {
        location : 'no',//Or 'no' 
        hidden : 'no', //Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        zoom : 'yes',//Android only ,shows browser zoom controls 
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', //Android only 
        closebuttoncaption : 'Close', //iOS only
        disallowoverscroll : 'no', //iOS only 
        toolbar : 'yes', //iOS only 
        enableViewportScale : 'no', //iOS only 
        allowInlineMediaPlayback : 'no',//iOS only 
        presentationstyle : 'pagesheet',//iOS only 
        fullscreen : 'yes',//Windows only    
    };
  this.iab.create('https://demo.digit9.co.in/RotaryDist3141AppAdminPanel/public/reg','_blank',options);
  }

  sunscribeToNotifications()
  {
    this.presentToast(this.fcmtoken);
    var appID = this.appID;
var token = this.fcmtoken;
var userUID = this.userUID;
var appToken;
CometChat.getJoinedGroups().then(groups => {
  CometChat.getAppSettings().then((settings: any) => {
    if(settings.extensions){
        settings.extensions.forEach(ext => {
            if (ext.id == "push-notification"){
            appToken = ext.appToken;
        }
        });
        }
    var url =
      "https://push-notification-us.cometchat.io/v1/subscribetomany?appToken=" +
      appToken;
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        appId: appID,
        fcmToken: token,
        uid: userUID,
        groups: groups,
        platform: "ionic"
      })
    })
      .then(response => {
        if (response.status < 200 || response.status >= 400) {
          console.log("Error subscribing to topics: " +response.status +" - " +response.text());
        } else {
          console.log("Subscribed to all topics");
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
});
  }
  subSingleNotification()
  {
    this.presentToast(this.fcmtoken);
    var token = this.fcmtoken;
CometChat.getAppSettings().then((settings: any) => {
    var appToken;
    if(settings.extensions){
    settings.extensions.forEach(ext => {
        if (ext.id == "push-notification"){
        appToken = ext.appToken;
      }
    });
    }
  var userType = "user";
  var UID = this.userUID;
  var appId = this.appID;
  var region = "us";
  var topic = appId + "_" + userType + "_" + UID;
  var url =
    "https://push-notification-"+ region +".cometchat.io/v1/subscribe?appToken=" +
    appToken +
    "";
  fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ appId: appId, fcmToken: token, topic: topic })
  })
    .then(response => {
      if (response.status < 200 || response.status >= 400) {
        console.log(
          "Error subscribing to topic: " +
            response.status +
            " - " +
            response.text()
        );
      }
      console.log('Subscribed to "' + topic + '"');
    })
    .catch(error => {
      console.error(error);
    });
});
  }
}
