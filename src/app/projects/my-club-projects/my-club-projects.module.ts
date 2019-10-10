import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyClubProjectsPage } from './my-club-projects.page';

const routes: Routes = [
  {
    path: '',
    component: MyClubProjectsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyClubProjectsPage]
})
export class MyClubProjectsPageModule {}
