import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SwipetabsPage } from './swipetabs.page';
import { TabOnePageModule } from './tab-one/tab-one.module';
import { TabOnePage } from './tab-one/tab-one.page';

const routes: Routes = [
  {
    path: '',
    component: SwipetabsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SwipetabsPage,TabOnePage]
})
export class SwipetabsPageModule {}
