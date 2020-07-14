import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {
  items: any;
  public userrole:any;
  public serverURL = SERVER_URL;
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };
   
  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private http: HttpClient,
    public alertController: AlertController
  ) {
    this.storage.get('role').then((role) => {
      this.userrole = role;
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    this.getbanners();
  }
  getbanners() {
    this.http.get(SERVER_URL + '/api/getbanners/')
    .subscribe((response: any) => {
      this.items = response;
  });
  }

  deletebanner(id)
  {
      this.http.delete(SERVER_URL + '/api/deletebanner/'+id)
      .subscribe((response: any) => {
        this.getbanners();
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
           this.deletebanner(id)
          }
        }
      ]
    });

    await alert.present();
  }

}
