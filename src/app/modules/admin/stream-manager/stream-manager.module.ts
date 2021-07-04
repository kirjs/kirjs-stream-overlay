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
import {StreamListComponent} from './stream-list/stream-list.component';
import {RouterModule} from '@angular/router';
import {StreamConfigComponent} from './stream-config/stream-config.component';
import {StreamListItemComponent} from './stream-list/stream-list-item/stream-list-item.component';
import {AngularFireModule} from '@angular/fire';
import {AccountListComponent} from './account-list/account-list.component';
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core';


@NgModule({
  declarations: [
    StreamListItemComponent,
    StreamManagerComponent,
    StreamListComponent,
    StreamConfigComponent,
    AccountListComponent,
  ],
  imports: [
    AngularFireModule,
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
    RouterModule,
    TuiSvgModule,
    TuiButtonModule,
  ],
})
export class StreamManagerModule {
}
