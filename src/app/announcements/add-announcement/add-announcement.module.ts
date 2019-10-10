import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddAnnouncementPage } from './add-announcement.page';

const routes: Routes = [
  {
    path: '',
    component: AddAnnouncementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddAnnouncementPage]
})
export class AddAnnouncementPageModule {}
