import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { NavigationExtras, Router } from '@angular/router';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: { title: string; url: string; icon: string; }[];
  constructor(
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private iab: InAppBrowser
  ) {
    this.sideMenu();
    this.initializeApp();
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
    this.iab.create('https://demo.digit9.co.in/dist/test/sample/chat/index.html','_blank',options);
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
}
