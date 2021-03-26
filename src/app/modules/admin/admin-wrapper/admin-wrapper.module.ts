import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminWrapperComponent } from './admin-wrapper.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [AdminWrapperComponent],
  imports: [CommonModule, RouterModule, LoginModule],
})
export class AdminWrapperModule {}
