import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WaitingScreenWrapperComponent } from './waiting-screen-wrapper.component';
import { WaitingScreenComponent } from './waiting-screen.component';

@NgModule({
  declarations: [WaitingScreenComponent, WaitingScreenWrapperComponent],
  exports: [WaitingScreenComponent],
  imports: [CommonModule],
})
export class WaitingScreenModule {}
