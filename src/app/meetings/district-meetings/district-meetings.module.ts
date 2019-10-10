import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DistrictMeetingsPage } from './district-meetings.page';

const routes: Routes = [
  {
    path: '',
    component: DistrictMeetingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DistrictMeetingsPage]
})
export class DistrictMeetingsPageModule {}
