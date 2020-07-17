import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, SERVER_URL } from '../../environments/environment';

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
    private http: HttpClient) {
      this.http.get(SERVER_URL + '/api/getbanners/')
    .subscribe((response: any) => {
      this.banners = response;
  });
     }

  ngOnInit() {}

}
