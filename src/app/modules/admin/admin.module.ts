import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamManagerModule } from './stream-manager/stream-manager.module';
import { TokensComponent } from './api-keys/tokens.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminWrapperModule } from './admin-wrapper/admin-wrapper.module';
import {ClipboardModule} from "@angular/cdk/clipboard";

@NgModule({
  declarations: [TokensComponent],
    imports: [
        StreamManagerModule,
        CommonModule,
        FormsModule,
        AdminWrapperModule,
        MatIconModule,
        MatButtonModule,
        AdminRoutingModule,
        ClipboardModule,
    ],
})
export class AdminModule {}
