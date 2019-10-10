import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProjectsPage } from './projects.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPage,
    children: [
      {
        path: 'my-club-projects',
        loadChildren: './my-club-projects/my-club-projects.module#MyClubProjectsPageModule'
      },
      {
        path: 'other-club-projects',
        loadChildren: './other-club-projects/other-club-projects.module#OtherClubProjectsPageModule'
      },
      {
        path: 'district-projects',
        loadChildren: './district-projects/district-projects.module#DistrictProjectsPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'projects/my-club-projects',
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
  declarations: [ProjectsPage]
})
export class ProjectsPageModule {}
