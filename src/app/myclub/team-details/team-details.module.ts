import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeamDetailsPage } from './team-details.page';
import { BannerSliderModule } from '../../banner-slider/banner-slider.module';

const routes: Routes = [
  {
    path: '',
    component: TeamDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerSliderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeamDetailsPage]
})
export class TeamDetailsPageModule {}
