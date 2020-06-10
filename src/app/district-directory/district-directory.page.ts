import { Component, OnInit } from '@angular/core';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-district-directory',
  templateUrl: './district-directory.page.html',
  styleUrls: ['./district-directory.page.scss'],
})
export class DistrictDirectoryPage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
  }

  openPdf(url)
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
  this.iab.create('https://docs.google.com/gview?embedded=true&url='+url,'_blank',options);
  }

}
