import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DateAgoPipe } from './../../pipes/date-ago.pipe';
import { IonicModule } from '@ionic/angular';

import { BlogListPage } from './blog-list.page';

const routes: Routes = [
  {
    path: '',
    component: BlogListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlogListPage, DateAgoPipe],
  exports: [DateAgoPipe],
})
export class BlogListPageModule {}
