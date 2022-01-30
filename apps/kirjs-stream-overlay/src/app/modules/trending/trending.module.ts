import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendingComponent } from './trending.component';

const routes: Routes = [
  {
    path: '',
    component: TrendingComponent,
  },
];

@NgModule({
  declarations: [TrendingComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TrendingModule {}
