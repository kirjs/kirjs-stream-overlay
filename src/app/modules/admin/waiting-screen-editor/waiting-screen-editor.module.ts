import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingScreenEditorComponent } from './waiting-screen-editor.component';
import { WaitingScreenModule } from '../../waiting-screen/waiting-screen.module';
import { FormsModule } from '@angular/forms';
import { AnnounceModule } from '../../announce/announce.module';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [WaitingScreenEditorComponent],
  imports: [
    CommonModule,
    WaitingScreenModule,
    FormsModule,
    AnnounceModule,
    LoginModule,
  ],
})
export class WaitingScreenEditorModule {}
