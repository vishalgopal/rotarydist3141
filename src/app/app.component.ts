import { Component } from '@angular/core';

import { Platform,LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { NavigationExtras, Router } from '@angular/router';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // tslint:disable-next-line:no-inferrable-types
  public appID: string = '2057898f28eaf75';
  // tslint:disable-next-line:no-inferrable-types
  public apiKey: string = 'ad105c360e8cf3e5c56f6241a29e0081fcbf48d9';

  public appRegion: string = 'us';
  public token:any;
  public hasPermission:any;
  
  public showSplash = true;

  navigate: { title: string; url: string; icon: string; }[];
  constructor(
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private iab: InAppBrowser,
    private fcm: FCM,
    private loadingController: LoadingController,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.sideMenu();
    this.initializeApp();
    this.onSubmit();
    // set a key/value
    // this.storage.set('clubid', '5d8064cfe1474026b8316aaf');
    // this.storage.set('username', 'Vishal');
    // this.storage.set('userid', '5d7bc87e9f1f8421a04be73f');
    // this.storage.set('district', '5d8066ace1474026b8316ab0');
    // this.storage.set('clubDesignation', 'president');
    // this.storage.set('districtDesignation', 'member');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(10000).subscribe(()=> this.showSplash = false);
     this.pushSetup();
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

  
  async pushSetup()
  {
    await this.platform.ready();
    console.log('FCM SETUP INIT');
    if (!this.platform.is('cordova')) {
      return;
    }

    console.log('IN CORDOVA');

    this.hasPermission = await this.fcm.requestPushPermission();
    console.log('CHECK hasPermission:', this.hasPermission);

    this.token = await this.fcm.getToken();
    localStorage.setItem("fcmtoken",this.token);
    console.log('CHECK getToken: ' + this.token);

    console.log('ON NOTIFICATION SUBSCRIBE');
    this.fcm
      .onTokenRefresh()
      .subscribe((newToken) => {
        console.log('NEW TOKEN:', newToken)
        localStorage.setItem("fcmtoken",newToken);
      });
    
      // this.fcm
    //   .onNotification()
    //   .subscribe((payload: object) => console.log('ON NOTIFICATION:', payload));

      
      this.fcm.onNotification().subscribe( data => {
        if(data.wasTapped){
          this.router.navigate(["dashboard"]);
        }else{
          this.router.navigate(["dashboard"]);
        }
      });

    this.fcm.subscribeToTopic('Rotary District 3141');
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
