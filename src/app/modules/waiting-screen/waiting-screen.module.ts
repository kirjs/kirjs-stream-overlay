import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingScreenComponent } from './waiting-screen.component';
import { WaitingScreenWrapperComponent } from './waiting-screen-wrapper.component';

@NgModule({
  declarations: [WaitingScreenComponent, WaitingScreenWrapperComponent],
  exports: [WaitingScreenComponent],
  imports: [CommonModule],
})
export class WaitingScreenModule {}
