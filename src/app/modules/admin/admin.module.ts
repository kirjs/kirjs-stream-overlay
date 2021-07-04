import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StreamManagerModule} from './stream-manager/stream-manager.module';
import {TokensComponent} from './api-keys/tokens.component';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminWrapperModule} from './admin-wrapper/admin-wrapper.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {AccountListModule} from './stream-manager/account-list/account-list.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RestreamInterceptor} from '../integrations/restream/restream.interceptor';

@NgModule({
  declarations: [TokensComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RestreamInterceptor,
    multi: true
  }],
  imports: [
    StreamManagerModule,
    CommonModule,
    FormsModule,
    AdminWrapperModule,
    MatIconModule,
    MatButtonModule,
    AdminRoutingModule,
    ClipboardModule,
    AccountListModule,
  ],
})
export class AdminModule {
}
