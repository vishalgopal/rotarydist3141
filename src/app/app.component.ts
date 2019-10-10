import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { NavigationExtras, Router } from '@angular/router';

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
    private router: Router
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
