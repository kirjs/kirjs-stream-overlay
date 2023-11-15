import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WaitingScreenWrapperComponent } from './waiting-screen-wrapper.component';
import { WaitingScreenComponent } from './waiting-screen.component';

@NgModule({
    exports: [WaitingScreenComponent],
    imports: [CommonModule, WaitingScreenComponent, WaitingScreenWrapperComponent],
})
export class WaitingScreenModule {}
