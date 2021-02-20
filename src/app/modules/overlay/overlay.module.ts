import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import {BarModule} from "./bar/bar.module";
import {ChatModule} from "./chat/chat.module";



@NgModule({
  declarations: [OverlayComponent],
  imports: [
    CommonModule,
    BarModule,
    ChatModule
  ]
})
export class OverlayModule { }
