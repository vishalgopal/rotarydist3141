import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OtherClubMeetingsPage } from './other-club-meetings.page';

const routes: Routes = [
  {
    path: '',
    component: OtherClubMeetingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OtherClubMeetingsPage]
})
export class OtherClubMeetingsPageModule {}
