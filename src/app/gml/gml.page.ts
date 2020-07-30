import { Component, OnInit } from '@angular/core';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';

@Component({
  selector: 'app-gml',
  templateUrl: './gml.page.html',
  styleUrls: ['./gml.page.scss'],
})
export class GmlPage implements OnInit {

  public gml :any;

  constructor(private iab: InAppBrowser, private http: HttpClient) { }

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
  ionViewWillEnter()
  {
    this.getresources();
  }
  getresources() {
      this.http.get(SERVER_URL + '/api/getresources/')
      .subscribe((response: any) => {
        this.gml = response;
        console.log(response)
    });
  }
}
