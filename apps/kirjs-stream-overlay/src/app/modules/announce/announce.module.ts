import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnnounceComponent } from './announce.component';

@NgModule({
  declarations: [AnnounceComponent],
  exports: [AnnounceComponent],
  imports: [CommonModule],
})
export class AnnounceModule {}
