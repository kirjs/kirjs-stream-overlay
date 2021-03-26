import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingScreenEditorModule } from './waiting-screen-editor/waiting-screen-editor.module';
import { TokensComponent } from './api-keys/tokens.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminWrapperModule } from './admin-wrapper/admin-wrapper.module';

@NgModule({
  declarations: [TokensComponent],
  imports: [
    WaitingScreenEditorModule,
    CommonModule,
    FormsModule,
    AdminWrapperModule,
    MatIconModule,
    MatButtonModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}
