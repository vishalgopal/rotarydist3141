import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeetingsPage } from './meetings.page';

const routes: Routes = [
  {
    path: '',
    component: MeetingsPage,
    children: [
      {
        path: 'my-club-meetings',
        loadChildren: './my-club-meetings/my-club-meetings.module#MyClubMeetingsPageModule'
      },
      {
        path: 'other-club-meetings',
        loadChildren: './other-club-meetings/other-club-meetings.module#OtherClubMeetingsPageModule'
      },
      {
        path: 'district-meetings',
        loadChildren: './district-meetings/district-meetings.module#DistrictMeetingsPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'meetings/my-club-meetings',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeetingsPage]
})
export class MeetingsPageModule {}
