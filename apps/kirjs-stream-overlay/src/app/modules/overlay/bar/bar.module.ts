import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarComponent } from './bar.component';

@NgModule({
    exports: [BarComponent],
    imports: [CommonModule, BarComponent],
})
export class BarModule {}
