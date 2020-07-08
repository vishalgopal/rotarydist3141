import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-rmb',
  templateUrl: './rmb.page.html',
  styleUrls: ['./rmb.page.scss'],
})
export class RmbPage implements OnInit {
  items: any;
  public userrole:any;
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
    this.getRMB();
  }
  getRMB() {
    this.http.get(SERVER_URL + '/api/getrmb/')
    .subscribe((response: any) => {
      this.items = response;
  });
  }

  deletermb(id)
  {
      this.http.delete(SERVER_URL + '/api/deleteRmb/'+id)
      .subscribe((response: any) => {
        this.getRMB();
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
           this.deletermb(id)
          }
        }
      ]
    });

    await alert.present();
  }
}
