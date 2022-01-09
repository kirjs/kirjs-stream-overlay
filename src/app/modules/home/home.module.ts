import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AnnounceModule } from '../announce/announce.module';
import { AdminButtonComponent } from './admin-button/admin-button.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, AdminButtonComponent],
  imports: [CommonModule, AnnounceModule, RouterModule, MatIconModule],
})
export class HomeModule {}
