import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StreamCompleteComponent } from './stream-complete.component';

@NgModule({
  declarations: [StreamCompleteComponent],
  exports: [StreamCompleteComponent],
  imports: [CommonModule],
})
export class StreamCompleteModule {}
