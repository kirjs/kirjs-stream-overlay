import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CrudModule } from '../crud/crud.module';
import { RestreamInterceptor } from '../integrations/restream/restream.interceptor';
import { AdminRoutingModule } from './admin-routing.module';

import { TokensComponent } from './api-keys/tokens.component';





@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RestreamInterceptor,
            multi: true,
        },
    ],
    imports: [
    CrudModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    AdminRoutingModule,
    ClipboardModule,
    TokensComponent,
],
})
export class AdminModule {}
