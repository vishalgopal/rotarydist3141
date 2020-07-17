import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BannerSliderComponent } from './banner-slider.component';


@NgModule({
  declarations: [
      BannerSliderComponent
  ],
  imports:[IonicModule,CommonModule,FormsModule],
  exports:[BannerSliderComponent]
})
export class BannerSliderModule {}
