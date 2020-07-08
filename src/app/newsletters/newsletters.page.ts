import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment, SERVER_URL } from '../../environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.page.html',
  styleUrls: ['./newsletters.page.scss'],
})
export class NewslettersPage implements OnInit {

  public items : any;
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
    this.getNewsletters();
  }
  getNewsletters() {
    this.http.get(SERVER_URL + '/api/getnewsletter/')
    .subscribe((response: any) => {
      this.items = response;
  });
  }

  deleteNewsletters(id)
  {
      this.http.delete(SERVER_URL + '/api/deleteNewsLetter/'+id)
      .subscribe((response: any) => {
        this.getNewsletters();
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
           this.deleteNewsletters(id)
          }
        }
      ]
    });

    await alert.present();
  }
}
