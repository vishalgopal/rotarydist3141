import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, SERVER_URL } from '../../environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss'],
})
export class BannerSliderComponent implements OnInit {

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };
   serverURL = SERVER_URL;
   private banners:any;

  constructor(
    private http: HttpClient,
    private alertController :AlertController) 
    {
      this.http.get(SERVER_URL + '/api/getbanners/')
    .subscribe((response: any) => {
      this.banners = response;
  });
     }

  openSlideImage(path)
  {
    var msg = "";
      msg = "<img src='"+path+"' width='100%'>";
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
  ngOnInit() {}

}
