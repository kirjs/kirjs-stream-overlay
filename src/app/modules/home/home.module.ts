import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnnounceModule } from '../announce/announce.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, AnnounceModule],
})
export class HomeModule {}
