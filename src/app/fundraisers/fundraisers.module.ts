import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FundraisersPage } from './fundraisers.page';

const routes: Routes = [
  {
    path: '',
    component: FundraisersPage,
    children: [
      {
        path: 'my-club-fundraisers',
        loadChildren: './my-club-fundraisers/my-club-fundraisers.module#MyClubFundraisersPageModule'
      },
      {
        path: 'other-club-fundraisers',
        loadChildren: './other-club-fundraisers/other-club-fundraisers.module#OtherClubFundraisersPageModule'
      },
      {
        path: 'district-fundraisers',
        loadChildren: './district-fundraisers/district-fundraisers.module#DistrictFundraisersPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'fundraisers/my-club-fundraisers'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FundraisersPage]
})
export class FundraisersPageModule {}
