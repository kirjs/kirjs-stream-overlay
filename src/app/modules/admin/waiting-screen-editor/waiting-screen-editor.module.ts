import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingScreenEditorComponent } from './waiting-screen-editor.component';
import { WaitingScreenModule } from '../../waiting-screen/waiting-screen.module';
import { AnnounceModule } from '../../announce/announce.module';
import { LoginModule } from '../login/login.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [WaitingScreenEditorComponent],
  imports: [
    CommonModule,
    WaitingScreenModule,
    AnnounceModule,
    LoginModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
})
export class WaitingScreenEditorModule {}
