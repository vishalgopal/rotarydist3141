import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment, SERVER_URL } from '../../environments/environment';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { MenuController,AlertController } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userid;
  notificationcnt;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };
   userrole:any;
   banners:any;
   public serverURL = SERVER_URL;

  constructor(
    private storage: Storage,
    private router: Router,
    private http: HttpClient,
    private iab: InAppBrowser,
    private menuCtrl:MenuController,
    private alertController :AlertController ) { }
  slides =
    [
      { name: 'Topic Seven', img: 'assets/images/home/event1.jpg', id: 5, details: 'Topic category' },
      { name: 'Topic Ten', img: 'assets/images/home/project1.jpg', id: 5, details: 'Topic category' },
      { name: 'Topic Eleven', img: 'assets/images/home/event1.jpg', id: 5, details: 'Topic category' }
    ];
    eventsOpts = {
      slidesPerView: 'auto',
      spaceBetween: 15,
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },
      speed: 600,
    };

    projectsOpts = {
      slidesPerView: 'auto',
      spaceBetween: 15,
      // autoplay: {
      //   delay: 3500,
      //   disableOnInteraction: false,
      // },
      speed: 600,
    };
  ngOnInit() {
    this.storage.get('role').then((role) => {
      this.userrole = role;
    });
    this.http.get(SERVER_URL + '/api/getbanners/')
    .subscribe((response: any) => {
      this.banners = response;
  });
    this.menuCtrl.enable(true);
    this.storage.get('userid').then((userid) => {
      this.userid = userid;
      this.getAnnounceCount();
    });
  }
  getAnnounceCount() {
    this.http.get(SERVER_URL + '/api/getannouncementcount/' + this.userid)
    .subscribe((response: any) => {
      this.notificationcnt = response;
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

  openSlideImage(path)
  {
    
    var msg = "";
    if(path == 'assets/ad_banner2.png')
    {
      msg = "<img src='assets/banner_display_image.png' width='100%'>";
    }
    else{
      msg = "<img src='"+path+"' width='100%'>";
    } 
    this.success(msg);
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
