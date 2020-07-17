import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemberSearchPage } from './member-search.page';
import { BannerSliderModule } from '../../banner-slider/banner-slider.module';

const routes: Routes = [
  {
    path: '',
    component: MemberSearchPage
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
  declarations: [MemberSearchPage]
})
export class MemberSearchPageModule {}
