import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingScreenEditorComponent } from './waiting-screen-editor.component';
import { WaitingScreenModule } from '../../waiting-screen/waiting-screen.module';
import { AnnounceModule } from '../../announce/announce.module';
import { LoginModule } from '../login/login.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { WysiwygEditorModule } from './wysiwyg-editor/wysiwyg-editor.module';

@NgModule({
  declarations: [WaitingScreenEditorComponent],
  imports: [
    WysiwygEditorModule,
    CommonModule,
    WaitingScreenModule,
    AnnounceModule,
    LoginModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
  ],
})
export class WaitingScreenEditorModule {}
