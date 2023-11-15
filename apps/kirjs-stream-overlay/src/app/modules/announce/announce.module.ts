import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnnounceComponent } from './announce.component';

@NgModule({
    exports: [AnnounceComponent],
    imports: [CommonModule, AnnounceComponent],
})
export class AnnounceModule {}
