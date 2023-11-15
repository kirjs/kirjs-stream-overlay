import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StreamCompleteComponent } from './stream-complete.component';

@NgModule({
    exports: [StreamCompleteComponent],
    imports: [CommonModule, StreamCompleteComponent],
})
export class StreamCompleteModule {}
