import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RestreamInterceptor } from '../integrations/restream/restream.interceptor';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminWrapperModule } from './admin-wrapper/admin-wrapper.module';
import { TokensComponent } from './api-keys/tokens.component';
import { AccountListModule } from './stream-manager/account-list/account-list.module';
import { StreamManagerModule } from './stream-manager/stream-manager.module';

@NgModule({
  declarations: [TokensComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestreamInterceptor,
      multi: true,
    },
  ],
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
export class AdminModule {}
