import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventsPage } from './events.page';
import { BannerSliderModule } from '../banner-slider/banner-slider.module';

const routes: Routes = [
  {
    path: '',
    component: EventsPage,
    children: [
      {
        path: 'my-club-events',
        loadChildren: './my-club-events/my-club-events.module#MyClubEventsPageModule'
      },
      {
        path: 'other-club-events',
        loadChildren: './other-club-events/other-club-events.module#OtherClubEventsPageModule'
      },
      {
        path: 'district-events',
        loadChildren: './district-events/district-events.module#DistrictEventsPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'events/my-club-events'
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
  declarations: [EventsPage]
})
export class EventsPageModule {}
