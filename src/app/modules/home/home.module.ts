import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {AnnounceModule} from '../announce/announce.module';



@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        AnnounceModule
    ]
})
export class HomeModule { }
