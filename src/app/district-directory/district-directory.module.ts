import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DistrictDirectoryPage } from './district-directory.page';

const routes: Routes = [
  {
    path: '',
    component: DistrictDirectoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DistrictDirectoryPage]
})
export class DistrictDirectoryPageModule {}
