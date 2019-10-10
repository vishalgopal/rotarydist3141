import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyClubMeetingsPage } from './my-club-meetings.page';

const routes: Routes = [
  {
    path: '',
    component: MyClubMeetingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyClubMeetingsPage]
})
export class MyClubMeetingsPageModule {}
