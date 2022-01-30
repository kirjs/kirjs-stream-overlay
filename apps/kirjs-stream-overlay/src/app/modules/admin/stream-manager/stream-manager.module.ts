import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AnnounceModule } from '../../announce/announce.module';
import { WaitingScreenModule } from '../../waiting-screen/waiting-screen.module';
import { LoginModule } from '../login/login.module';
import { AccountListComponent } from './account-list/account-list.component';
import { StreamConfigComponent } from './stream-config/stream-config.component';
import { StreamListItemComponent } from './stream-list/stream-list-item/stream-list-item.component';
import { StreamListComponent } from './stream-list/stream-list.component';
import { StreamManagerComponent } from './stream-manager.component';
import { WysiwygEditorModule } from './wysiwyg-editor/wysiwyg-editor.module';

@NgModule({
  declarations: [
    StreamListItemComponent,
    StreamManagerComponent,
    StreamListComponent,
    StreamConfigComponent,
    AccountListComponent,
  ],
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
    RouterModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
  ],
})
export class StreamManagerModule {}
