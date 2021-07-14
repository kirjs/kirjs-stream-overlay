import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarComponent } from './bar.component';

@NgModule({
  declarations: [BarComponent],
  exports: [BarComponent],
  imports: [CommonModule],
})
export class BarModule {}
