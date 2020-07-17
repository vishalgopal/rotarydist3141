import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrivacySettingsPage } from './privacy-settings.page';
import { BannerSliderModule } from '../banner-slider/banner-slider.module';

const routes: Routes = [
  {
    path: '',
    component: PrivacySettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BannerSliderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrivacySettingsPage]
})
export class PrivacySettingsPageModule {}
