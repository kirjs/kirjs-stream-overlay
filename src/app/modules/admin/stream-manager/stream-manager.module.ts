import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StreamManagerComponent} from './stream-manager.component';
import {WaitingScreenModule} from '../../waiting-screen/waiting-screen.module';
import {AnnounceModule} from '../../announce/announce.module';
import {LoginModule} from '../login/login.module';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {WysiwygEditorModule} from './wysiwyg-editor/wysiwyg-editor.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { StreamListComponent } from './stream-list/stream-list.component';


@NgModule({
  declarations: [StreamManagerComponent, StreamListComponent],
  imports: [
    WysiwygEditorModule,
    CommonModule,
    WaitingScreenModule,
    MatSnackBarModule,
    AnnounceModule,
    LoginModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
  ],
})
export class StreamManagerModule {
}
