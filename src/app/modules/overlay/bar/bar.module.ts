import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarComponent} from './bar.component';


@NgModule({
  declarations: [BarComponent],
  exports: [
    BarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BarModule {
}
