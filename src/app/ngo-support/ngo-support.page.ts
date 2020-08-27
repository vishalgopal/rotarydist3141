import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';
import { AlertController } from '@ionic/angular';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-ngo-support',
  templateUrl: './ngo-support.page.html',
  styleUrls: ['./ngo-support.page.scss'],
})
export class NgoSupportPage implements OnInit {
  ngos: any;
  public userrole:any;
 
  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private http: HttpClient,
    private iab: InAppBrowser,
    public alertController: AlertController
  ) {
    this.storage.get('role').then((role) => {
      this.userrole = role;
    });
   }

  ngOnInit() {
    
    this.getNgo();
  }

  getNgo() {
    this.http.get(SERVER_URL + '/api/getNgo/')
    .subscribe((response: any) => {
      this.ngos = response;
  });
  }

  deleteNgo(id)
  {
      this.http.delete(SERVER_URL + '/api/deleteNgo/'+id)
      .subscribe((response: any) => {
        this.getNgo();
    });
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.deleteNgo(id)
          }
        }
      ]
    });

    await alert.present();
  }

  visitSite( siteUrl )
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
    this.iab.create(siteUrl,'_blank',options);
  }
}