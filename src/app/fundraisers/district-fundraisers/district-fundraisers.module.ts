import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DistrictFundraisersPage } from './district-fundraisers.page';

const routes: Routes = [
  {
    path: '',
    component: DistrictFundraisersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DistrictFundraisersPage]
})
export class DistrictFundraisersPageModule {}
