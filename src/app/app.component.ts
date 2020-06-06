import { Component } from '@angular/core';

import { Platform,LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { NavigationExtras, Router } from '@angular/router';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public userUID: 'superhero4';
  // tslint:disable-next-line:no-inferrable-types
  public appID: string = '19737bb55d651b4';
  // tslint:disable-next-line:no-inferrable-types
  public apiKey: string = 'b64c4d5600659ced1ac6d990f581e331e751d040';

  public appRegion: string = 'us';

  navigate: { title: string; url: string; icon: string; }[];
  constructor(
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private iab: InAppBrowser,
    private fcm: FCM,
    private loadingController: LoadingController
  ) {
    this.sideMenu();
    this.initializeApp();
    this.onSubmit();
    this.getToken();
    // set a key/value
    // this.storage.set('clubid', '5d8064cfe1474026b8316aaf');
    // this.storage.set('username', 'Vishal');
    // this.storage.set('userid', '5d7bc87e9f1f8421a04be73f');
    // this.storage.set('district', '5d8066ace1474026b8316ab0');
    // this.storage.set('clubDesignation', 'president');
    // this.storage.set('districtDesignation', 'member');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    this.storage.set('fcmtoken', token);
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openEvent(event){
    const navigationExtras: NavigationExtras = {
      state: {
        eventType: event,
      }
    };
    this.storage.set('eventType', event);
    this.router.navigate(['/events/my-club-events'], navigationExtras);
  }

  gotoPaymentPage()
  {
    const options : InAppBrowserOptions = {
      location : 'no',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'no',//Android only ,shows browser zoom controls 
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
    this.iab.create('https://www.ftcash.com/app/pay/store/rotarydistrictevents','_blank',options);
  }

  gotoChatPage()
  {
    this.router.navigate(['/tabs']);
  }
  sideMenu() {
    this.navigate = [
      {
        title : "Dashboard",
        url   : "/dashboard",
        icon  : "apps"
      },
      {
        title : "Profile",
        url   : "/profile",
        icon  : "person"
      },
      {
        title : "My Club",
        url   : "/myclub",
        icon  : "star"
      },
      {
        title : "Events",
        url   : "/events/my-club-events",
        icon  : "calendar"
      },
      {
        title : "Fund Raisers",
        url   : "/fundraisers",
        icon  : "logo-usd"
      },
      {
        title : "Contacts",
        url   : "/contacts",
        icon  : "call"
      },
      
      // {
      //   title : "Blog",
      //   url   : "/blog",
      //   icon  : "list-box"
      // },
    ];
  }
  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      spinner: 'dots',
      translucent: true
    });
    loading.present();
    CometChat.init(this.appID, new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(this.appRegion)
    .build()).then(

      () => {
        console.log('Initialization completed successfully');
        loading.dismiss();
        // You can now call login function.
      },
      error => {
        console.log('Initialization failed with error:', error);
        console.log(error.message);
        // Check the reason for error and take apppropriate action.
      }

    );
  }

}
