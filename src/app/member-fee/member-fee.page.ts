import { Component, OnInit } from '@angular/core';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-member-fee',
  templateUrl: './member-fee.page.html',
  styleUrls: ['./member-fee.page.scss'],
})
export class MemberFeePage implements OnInit {

  constructor(private iab: InAppBrowser) {
    
   }

  ngOnInit() {
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

}
